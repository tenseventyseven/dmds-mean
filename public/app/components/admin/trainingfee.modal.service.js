"use strict";

angular.module('app')

  .factory('trainingFeeModalService', trainingFeeModalService);

function trainingFeeModalService($uibModal, $log) {
  var service = {
    openModal: openModal
  };

  return service;

  // open a modal
  function openModal(modalData) {
    return $uibModal.open({
      animation: true,
      templateUrl: 'app/components/admin/trainingfee.modal.view.html',
      controller: 'trainingFeeModalController',
      controllerAs: '$ctrl',
      resolve: {
        modalData: function() {
          return modalData;
        }
      }
    });
  }
}
