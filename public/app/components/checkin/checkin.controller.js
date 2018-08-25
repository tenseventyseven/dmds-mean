"use strict";

angular.module('app')

  .controller('checkinController', checkinController);

function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function checkinController(dateService, memberService, activityService, popupModalService, sessionService, trainingFeeService, insuranceFeeService, attendanceService, $log) {
  var vm = this;

  // Functions
  vm.findClicked = findClicked;
  vm.cancelClicked = cancelClicked;
  vm.okClicked = okClicked;
  vm.reset = reset;
  vm.deselectClassActivities = deselectClassActivities;
  vm.deselectOtherActivities = deselectOtherActivities;
  vm.nameFilter = nameFilter;

  // Init properties
  initProperties();

  // Init controller
  initController();

  function initProperties() {
    vm.members = {};
    vm.memberNames = {};
    vm.memberId = undefined;
    vm.memberData = {};
    vm.memberPhoto = undefined;
    vm.nameInput = "";
    vm.isFound = false;
    vm.messageForMember = undefined;
    vm.feesDue = undefined;
    vm.selectedMember = undefined;
    vm.selectedActivity = undefined;
    vm.session = undefined;
  }

  function initController() {
    // Get activites
    vm.classActivities = activityService.getClassActivities();
    vm.otherActivities = activityService.getOtherActivities();

    // Get members
    memberService
      .getActiveMembers() // Get list of member (name, id)
      .then(function(response) {
        var data = response.data;

        // Sort list for search box
        vm.members = data;
        vm.memberNames = _.sortBy(data, 'person.name');
        vm.memberNames = _.map(vm.members, 'person.name');
      });
  }

  function nameFilter(state, viewValue) {
    var split = state.split(' ');
    var firstName = split[0];
    var lastName = split[split.length - 1];

    if (state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase()) {
      return true;
    }

    if (lastName.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase()) {
      return true;
    }

    return false;
  }

  function findClicked() {
    // Only do something if input is a member
    if (_.includes(vm.memberNames, vm.nameInput)) {
      // Show checkin controls
      vm.isFound = true;

      // Get member data
      vm.memberId = _.find(vm.members, {
        person: {
          name: vm.nameInput
        }
      })._id;
      memberService
        .getMember(vm.memberId)
        .then(function(response) {
          var data = response.data;

          vm.memberData = data;

          // Get message if exists
          if (vm.memberData.notes && vm.memberData.notes.messageForMember) {
            vm.messageForMember = vm.memberData.notes.messageForMember;
          }

          // Get member photo
          memberService
            .getMemberPhoto(vm.memberData.memberId)
            .then(function(response) {
              vm.memberPhoto = 'data:image/jpeg;base64,' + _arrayBufferToBase64(response.data)
            }, function(response) {
              // No member photo, do nothing
            });
        })
        .then(function() {
          // Check if fees due
          var currentTime = new Date();
          var insuranceDue = false;
          var trainingFeesDue = false;

          // Get latest insurance expiry date
          insuranceFeeService
            .getInsuranceFeesByMember(vm.memberData.memberId)
            .then(function(response) {
              var data = response.data;

              // Get latest fee to update expiry date
              if (data.length > 0) {
                var startDate = data[0].startDate;
                var months = data[0].months;

                if (currentTime >= dateService.getExpiryDate(startDate, months, 0)) {
                  insuranceDue = true;
                }
              }
            })
            .then(function() {
              // Get latest training expiry date
              trainingFeeService
                .getTrainingFeesByMember(vm.memberData.memberId)
                .then(function(response) {
                  var data = response.data;

                  // Get latest fee to update expiry date
                  if (data.length > 0) {
                    var startDate = data[0].startDate;

                    if (data[0].months) {
                      // Monthly fees
                      var months = data[0].months;

                      if (currentTime >= dateService.getExpiryDate(startDate, months, 0)) {
                        trainingFeesDue = true;
                      }

                      // Set fees due message
                      if (insuranceDue || trainingFeesDue) {
                        if (insuranceDue && trainingFeesDue) {
                          vm.feesDue = 'BOTH Insurance AND Training Fees DUE!';
                        } else if (insuranceDue) {
                          vm.feesDue = 'Insurance Fees DUE!';
                        } else {
                          vm.feesDue = 'Training Fees DUE!';
                        }
                      }
                    } else {
                      // Daily fees
                      var days = data[0].days;

                      attendanceService
                        .getAttendancesByMemberAndTime(vm.memberData.memberId, startDate)
                        .then(function(response) {
                          var data = response.data;

                          if (data >= days) {
                            // Days used up
                            trainingFeesDue = true;
                          } else {
                            // Add days left message for member
                            if (vm.messageForMember == undefined) {
                              vm.messageForMember = (days - data) + ' session(s) remaining';
                            } else {
                              vm.messageForMember += ' | ' + (days - data) + ' session(s) remaining';
                            }
                          }

                          // Set fees due message
                          if (insuranceDue || trainingFeesDue) {
                            if (insuranceDue && trainingFeesDue) {
                              vm.feesDue = 'BOTH Insurance AND Training Fees DUE!';
                            } else if (insuranceDue) {
                              vm.feesDue = 'Insurance Fees DUE!';
                            } else {
                              vm.feesDue = 'Training Fees DUE!';
                            }
                          }
                        });
                    }
                  }
                });
            });
        });
    }
  }

  function cancelClicked() {
    // Reset
    reset();
  }

  function okClicked() {
    // Only do something if a activity has been selected
    if (vm.selectedActivity != undefined && vm.selectedActivity.length > 0) {

      // Get session
      vm.session = sessionService.getSession(new Date());

      // Open modal
      var modalData = {
        session: vm.session,
        activity: vm.selectedActivity[0]

      };
      var modal = popupModalService.openModal(modalData);

      modal.result.then(function() {
        // OK
        $log.info(vm.memberData.memberId + ' is doing ' + modalData.session + ' - ' + modalData.activity);

        // Create attendance
        var attendance = {
          memberId: vm.memberData.memberId,
          activity: modalData.activity,
          session: modalData.session,
          time: new Date()
        };

        attendanceService
          .createAttendance(attendance)
          .then(function(response) {
            var data = response.data;
            $log.info(data);
          }, function(response) {
            var data = response.data;
            $log.error(data);
          });

        // Reset
        reset();
      }, function() {
        // Cancel, do nothing
      });
    }
  }

  function reset() {
    // Reset properties
    initProperties();

    // Reset controller
    initController();

    // Remove active from list items
    $(".list-group-item").each(function(i, obj) {
      $(obj).removeClass('active');
    });
  }

  function deselectClassActivities() {
    // Remove active from list items
    $("#classactivity-list-group").children(".list-group-item").each(function(i, obj) {
      $(obj).removeClass('active');
    });
  }

  function deselectOtherActivities() {
    // Remove active from list items
    $("#otheractivity-list-group").children(".list-group-item").each(function(i, obj) {
      $(obj).removeClass('active');
    });
  }
}
