"use strict";

angular.module('app')

  .controller('trainingFeeModalController', trainingFeeModalController);

function trainingFeeModalController($uibModalInstance, modalData) {
  var vm = this;
  vm.startDate = new Date(modalData.startDate);
  vm.price = modalData.price;
  vm.days = modalData.days;
  vm.months = modalData.months;
  vm.description = modalData.description;

  vm.save = function() {
    // Return data from modal
    $uibModalInstance.close({
      'startDate': vm.startDate,
      'price': vm.price,
      'days': vm.days,
      'months': vm.months,
      'description': vm.description
    });
  };

  vm.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}
