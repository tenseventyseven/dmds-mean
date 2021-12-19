"use strict";

angular
  .module("app")

  .controller("confirmModalController", confirmModalController);

function confirmModalController($uibModalInstance, modalData) {
  var vm = this;
  vm.type = modalData.type;
  vm.message = modalData.message;

  vm.delete = function () {
    $uibModalInstance.close();
  };

  vm.ok = function () {
    $uibModalInstance.close();
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
}
