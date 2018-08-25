"use strict";

angular.module('app')

  .controller('popupModalController', popupModalController);

function popupModalController($uibModalInstance, modalData, quotesService, $timeout) {
  var vm = this;
  vm.session = modalData.session;
  vm.activity = modalData.activity;
  vm.quote = quotesService.getRandomQuote();

  vm.ok = function() {
    $uibModalInstance.close();
  };

  vm.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}
