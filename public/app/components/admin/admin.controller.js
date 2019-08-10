"use strict";

angular.module('app')

  .controller('adminController', adminController);

function adminController(dateService, memberService, trainingFeeService, insuranceFeeService, attendanceService, confirmModalService, trainingFeeModalService, insuranceFeeModalService, $log) {
  var vm = this;
  // Properties
  vm.members = {};
  vm.memberNames = {};
  vm.memberId = undefined;
  vm.memberData = {};
  vm.memberDates = {};
  vm.memberTrainingFees = [];
  vm.memberInsuranceFees = [];
  vm.memberAttendances = [];
  vm.memberPhoto = undefined;
  vm.nameInput = '';
  vm.doFind = false;
  vm.doAdd = false;
  vm.readOnly = false;
  vm.showAttendance = false;
  vm.todayAttendance = [];

  // Functions
  vm.nameFilter = nameFilter;
  vm.addMemberClicked = addMemberClicked;
  vm.findMemberClicked = findMemberClicked;
  vm.cancelMemberClicked = cancelMemberClicked;
  vm.saveMemberClicked = saveMemberClicked;
  vm.deleteMemberClicked = deleteMemberClicked;
  vm.editMemberClicked = editMemberClicked;
  vm.addTrainingFeeClicked = addTrainingFeeClicked;
  vm.editTrainingFeeClicked = editTrainingFeeClicked;
  vm.deleteTrainingFeeClicked = deleteTrainingFeeClicked;
  vm.addInsuranceFeeClicked = addInsuranceFeeClicked;
  vm.editInsuranceFeeClicked = editInsuranceFeeClicked;
  vm.deleteInsuranceFeeClicked = deleteInsuranceFeeClicked;
  vm.showAttendanceClicked = showAttendanceClicked;
  vm.refreshAttendanceClicked = refreshAttendanceClicked;
  vm.cancelAttendanceClicked = cancelAttendanceClicked;
  vm.resetProperties = resetProperties;

  init();

  function init() {
    $log.debug('Init at ' + new Date());

    // Get all members
    memberService
      .getMembers() // Get list of member (name, id)
      .then(function(response) {
        var data = response.data;

        // Sort list for search box
        vm.members = data;
        vm.memberNames = _.sortBy(data, 'person.name');
        vm.memberNames = _.map(vm.members, 'person.name');
      });
  }

  function getTrainingFees(memberId) {
    trainingFeeService
      .getTrainingFeesByMember(memberId)
      .then(function(response) {
        var data = response.data;

        vm.memberTrainingFees = data;

        // Get latest fee to update expiry date
        if (vm.memberTrainingFees.length > 0 && !vm.memberTrainingFees[0].days) {
          var startDate = vm.memberTrainingFees[0].startDate;
          var months = vm.memberTrainingFees[0].months;

          vm.memberDates.trainingFeesExpiry = dateService.getExpiryDate(startDate, months);
        } else {
          vm.memberDates.trainingFeesExpiry = 'N/A';
        }
      });
  }

  function getInsuranceFees(memberId) {
    insuranceFeeService
      .getInsuranceFeesByMember(memberId)
      .then(function(response) {
        var data = response.data;

        vm.memberInsuranceFees = data;

        // Get latest fee to update expiry date
        if (vm.memberInsuranceFees.length > 0) {
          var startDate = vm.memberInsuranceFees[0].startDate;
          var months = vm.memberInsuranceFees[0].months;

          vm.memberDates.insuranceFeesExpiry = dateService.getExpiryDate(startDate, months);
        } else {
          vm.memberDates.insuranceFeesExpiry = 'N/A';
        }
      });
  }

  function getAttendances(memberId) {
    attendanceService
      .getAttendancesByMember(memberId)
      .then(function(response) {
        var data = response.data;

        vm.memberAttendances = data;
      });
  }

  function getLatestAttendance(memberId) {
    attendanceService
      .getLatestAttendanceByMember(memberId)
      .then(function(response) {
        var data = response.data;

        if (data.time) {
          vm.memberDates.lastAttended = new Date(data.time);
        }
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

  function addMemberClicked() {
    $log.debug('Add member clicked at ' + new Date());
    // Clear member data first
    vm.memberId = undefined;
    vm.memberData = {};
    vm.memberDates = {};
    vm.memberTrainingFees = [];
    vm.memberInsuranceFees = [];

    // Clear any search input
    vm.nameInput = '';

    // Get next member ID
    memberService
      .getNext()
      .then(function(response) {
        var data = response.data;

        vm.memberData.memberId = data;
      });

    // New empty member
    vm.memberData = {
      memberId: undefined,
      person: {},
      membership: {
        active: true
      },
      notes: {}
    };

    // Show add new member controls
    vm.doAdd = true;
  }

  function findMemberClicked() {
    $log.debug('Find member clicked at ' + new Date());
    // Clear member data first
    vm.memberId = undefined;
    vm.memberData = {};
    vm.memberDates = {};
    vm.memberTrainingFees = [];
    vm.memberInsuranceFees = [];

    // Only do something if input is a member
    if (_.includes(vm.memberNames, vm.nameInput)) {
      // Show edit found member controls
      vm.doFind = true;

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

          // Create date objects from date strings for use with view-model
          if (vm.memberData.person.dob) {
            vm.memberDates.dob = new Date(vm.memberData.person.dob);
          }
          if (vm.memberData.membership.commencementDate) {
            vm.memberDates.commenced = new Date(vm.memberData.membership.commencementDate);
          }
          if (vm.memberData.membership.lockerExpiryDate) {
            vm.memberDates.lockerExpiry = new Date(vm.memberData.membership.lockerExpiryDate);
          }

          // Get member photo
          memberService
            .getMemberPhoto(vm.memberData.memberId)
            .then(function(response) {
              vm.memberPhoto = 'data:image/jpeg;base64,' + _arrayBufferToBase64(response.data)
            }, function(response) {
              // No member photo
              vm.memberPhoto = undefined;
            });

          // Get member training fees
          getTrainingFees(vm.memberData.memberId);

          // Get member insurance fees
          getInsuranceFees(vm.memberData.memberId);

          // Get latest member attendance
          getLatestAttendance(vm.memberData.memberId);

          // Get all member attendances
          getAttendances(vm.memberData.memberId);
        });

      // But don't allow editing by default
      vm.readOnly = true;

      // Clear search input
      vm.nameInput = '';
    }
  }

  function cancelMemberClicked() {
    $log.debug('Cancel member clicked at ' + new Date());

    // Reset view model
    resetProperties();

    // Reinit
    init();
  }

  function saveMemberClicked() {
    $log.debug('Save member clicked at ' + new Date());

    // Modal
    var modalData;
    if (vm.doAdd) {
      modalData = {
        type: 'okCancel',
        message: 'Add new member ' + vm.memberData.person.name + '?'
      };
    } else {
      modalData = {
        type: 'okCancel',
        message: 'Update existing member ' + vm.memberData.person.name + '?'
      };
    }

    // Open modal
    var modal = confirmModalService
      .openModal(modalData)
      .result.then(function() {
        // Update member data with date objects from view-model
        vm.memberData.person.dob = vm.memberDates.dob;
        vm.memberData.membership.commencementDate = vm.memberDates.commenced;
        vm.memberData.membership.lockerExpiryDate = vm.memberDates.lockerExpiry;

        // Save member data
        if (vm.doAdd) {
          // Adding new member
          memberService
            .createMember(vm.memberData)
            .then(function() {
              $log.info('Added member at: ' + new Date());
              // Reset view model
              resetProperties();
              // Reinit
              init();
            });
        } else {
          // Updating existing member
          memberService
            .updateMember(vm.memberId, vm.memberData)
            .then(function() {
              $log.info('Updated member at: ' + new Date());
              // Reset view model
              resetProperties();
              // Reinit
              init();
            });
        }
      }, function() {
        $log.info('Confirm modal dismissed at: ' + new Date());
      });
  }

  function deleteMemberClicked() {
    $log.debug('Delete member clicked at ' + new Date());

    // Modal
    var modalData = {
      type: 'deleteCancel',
      message: 'Delete existing member ' + vm.memberData.person.name + '?'
    };

    // Open modal
    var modal = confirmModalService
      .openModal(modalData)
      .result.then(function() {
        // Delete existing member
        memberService
          .deleteMember(vm.memberId)
          .then(function() {
            $log.info('Deleted member at: ' + new Date());
            // Reset view model
            resetProperties();
            // Reinit
            init();
          });

      }, function() {
        $log.info('Delete member modal dismissed at: ' + new Date());
      });
  }

  function editMemberClicked() {
    $log.debug('Edit member clicked at ' + new Date());

    // Allow editing of member data
    vm.readOnly = false;
  }

  function addTrainingFeeClicked() {
    $log.debug('Add training fee clicked at ' + new Date());

    // Modal data
    var modalData = {
      // No data
    };

    // Open modal
    var modal = trainingFeeModalService
      .openModal(modalData)
      .result.then(function(data) {
        // Add fee
        trainingFeeService
          .createTrainingFee({
            'memberId': vm.memberData.memberId,
            'startDate': data.startDate,
            'price': data.price,
            'months': data.months,
            'days': data.days,
            'description': data.description
          })
          .then(function(response) {
            var data = response.data;

            $log.info(data.message);

            // Refresh member training fees
            getTrainingFees(vm.memberData.memberId);
          });
      }, function(data) {
        $log.info('Add training fee modal dismissed at: ' + new Date());
      });
  }

  function editTrainingFeeClicked(index) {
    $log.debug('Edit training fee clicked at ' + new Date() + ' for ' + index);

    // Get fee
    trainingFeeService
      .getTrainingFee(vm.memberTrainingFees[index]._id)
      .then(function(response) {
        var data = response.data;

        // Modal data
        var modalData = {
          'startDate': data.startDate,
          'price': data.price,
          'months': data.months,
          'days': data.days,
          'description': data.description
        };

        // Open modal
        var modal = trainingFeeModalService
          .openModal(modalData)
          .result.then(function(data) {
            // Add fee
            trainingFeeService
              .updateTrainingFee(vm.memberTrainingFees[index]._id, {
                'startDate': data.startDate,
                'price': data.price,
                'months': data.months,
                'days': data.days,
                'description': data.description
              })
              .then(function(response) {
                var data = response.data;

                $log.info(data.message);

                // Refresh member training fees
                getTrainingFees(vm.memberData.memberId);
              });
          }, function() {
            $log.info('Edit training fee modal dismissed at: ' + new Date());
          });
      });
  }

  function deleteTrainingFeeClicked(index) {
    $log.debug('Delete training fee clicked at ' + new Date() + ' for ' + index);

    // Remove fee
    trainingFeeService
      .deleteTrainingFee(vm.memberTrainingFees[index]._id)
      .then(function(response) {
        var data = response.data;

        $log.info(data.message);

        // Refresh member training fees
        getTrainingFees(vm.memberData.memberId);
      });
  }

  function addInsuranceFeeClicked() {
    $log.debug('Add insurance fee clicked at ' + new Date());

    // Modal data
    var modalData = {
      // No data
    };

    // Open modal
    var modal = insuranceFeeModalService
      .openModal(modalData)
      .result.then(function(data) {
        // Add fee
        insuranceFeeService
          .createInsuranceFee({
            'memberId': vm.memberData.memberId,
            'startDate': data.startDate,
            'price': data.price,
            'months': data.months
          })
          .then(function(response) {
            var data = response.data;

            $log.info(data.message);

            // Refresh member insurance fees
            getInsuranceFees(vm.memberData.memberId);
          });
      }, function(data) {
        $log.info('Add insurance fee modal dismissed at: ' + new Date());
      });
  }

  function editInsuranceFeeClicked(index) {
    $log.debug('Edit insurance fee clicked at ' + new Date() + ' for ' + index);

    // Get fee
    insuranceFeeService
      .getInsuranceFee(vm.memberInsuranceFees[index]._id)
      .then(function(response) {
        var data = response.data;

        console.log(data);

        // Modal data
        var modalData = {
          'startDate': data.startDate,
          'price': data.price,
          'months': data.months
        };

        // Open modal
        var modal = insuranceFeeModalService
          .openModal(modalData)
          .result.then(function(data) {
            // Add fee
            insuranceFeeService
              .updateInsuranceFee(vm.memberInsuranceFees[index]._id, {
                'startDate': data.startDate,
                'price': data.price,
                'months': data.months
              })
              .then(function(response) {
                var data = response.data;

                $log.info(data.message);

                // Refresh member insurance fees
                getInsuranceFees(vm.memberData.memberId);
              });
          }, function() {
            $log.info('Edit insurance fee modal dismissed at: ' + new Date());
          });
      });
  }

  function deleteInsuranceFeeClicked(index) {
    $log.debug('Delete insurance fee clicked at ' + new Date() + ' for ' + index);

    // Remove fee
    insuranceFeeService
      .deleteInsuranceFee(vm.memberInsuranceFees[index]._id)
      .then(function(response) {
        var data = response.data;

        $log.info(data.message);

        // Refresh member insurance fees
        getInsuranceFees(vm.memberData.memberId);
      });
  }

  function todayInYYYYMMDD() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
  }

  function showAttendanceClicked() {
    $log.debug('Show attendance clicked at ' + new Date());

    vm.showAttendance = true;

    // Clear attendances in case of refresh
    vm.todayAttendance = [];

    // Get attendances
    attendanceService
      .getAttendancesForYYYYMMDD(todayInYYYYMMDD())
      .then(function(response) {
        var data = response.data;

        _.forEach(data, function(attendance) {
          // Parse attendance for vm
          var name = _.find(vm.members, {
            memberId: attendance.memberId
          }).person.name;
          var time = new Date(attendance.time);
          var activity = attendance.activity;

          // Check if fees due
          var note = '';
          var currentTime = new Date();
          var insuranceDue = false;
          var trainingFeesDue = false;

          // Get latest insurance expiry date
          insuranceFeeService
            .getInsuranceFeesByMember(attendance.memberId)
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
                .getTrainingFeesByMember(attendance.memberId)
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
                          note = 'BOTH Insurance AND Training Fees DUE!';
                        } else if (insuranceDue) {
                          note = 'Insurance Fees DUE!';
                        } else {
                          note = 'Training Fees DUE!';
                        }
                      }

                      // Push
                      vm.todayAttendance.push({
                        name,
                        time,
                        activity,
                        note
                      });
                    } else {
                      // Daily fees
                      var days = data[0].days;

                      attendanceService
                        .getAttendancesByMemberAndTime(attendance.memberId, startDate)
                        .then(function(response) {
                          var data = response.data;

                          if (data >= days) {
                            // Days used up
                            trainingFeesDue = true;
                          } else {
                            // Sessions remaining
                            note = (days - data) + ' session(s) remaining';
                          }

                          // Set fees due message
                          if (insuranceDue || trainingFeesDue) {
                            if (insuranceDue && trainingFeesDue) {
                              note ? note = note + ', ' + 'BOTH Insurance AND Training Fees DUE!' : note = 'BOTH Insurance AND Training Fees DUE!';
                            } else if (insuranceDue) {
                              note ? note = note + ', ' + 'Insurance Fees DUE!' : note = 'Insurance Fees DUE!';
                            } else {
                              note ? note = note + ', ' + 'Training Fees DUE!' : note = 'Training Fees DUE!';
                            }
                          }

                          // Push
                          vm.todayAttendance.push({
                            name,
                            time,
                            activity,
                            note
                          });
                        });
                    }
                  }
                });
            });
        });
      });

  }

  function refreshAttendanceClicked() {
    $log.debug('Refresh attendance clicked at ' + new Date());

    showAttendanceClicked();
  }

  function cancelAttendanceClicked() {
    $log.debug('Cancel attendance clicked at ' + new Date());

    // Reset view model
    resetProperties();

    // Reinit
    init();
  }

  function resetProperties() {
    $log.debug('Reset properties at ' + new Date());

    // Reset properties
    vm.memberId = undefined;
    vm.memberData = {};
    vm.memberDates = {};
    vm.memberTrainingFees = [];
    vm.memberInsuranceFees = [];
    vm.memberAttendances = [];
    vm.nameInput = '';
    vm.doAdd = false;
    vm.doFind = false;
    vm.readOnly = false;
    vm.showAttendance = false;
    vm.todayAttendance = [];
    vm.memberPhoto = undefined;

  }
}
