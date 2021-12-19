"use strict";

angular
  .module("app")

  .controller("insuranceFeeModalController", insuranceFeeModalController);

function insuranceFeeModalController($uibModalInstance, modalData) {
  var vm = this;
  vm.startDate = new Date(modalData.startDate);
  vm.price = modalData.price;
  vm.months = modalData.months;

  vm.save = function () {
    // Return data from modal
    $uibModalInstance.close({
      startDate: vm.startDate,
      price: vm.price,
      months: vm.months,
    });
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
}
