"use strict";

angular.module('app')

  .factory('insuranceFeeModalService', insuranceFeeModalService);

function insuranceFeeModalService($uibModal, $log) {
  var service = {
    openModal: openModal
  };

  return service;

  // open a modal
  function openModal(modalData) {
    return $uibModal.open({
      animation: true,
      templateUrl: 'app/components/admin/insurancefee.modal.view.html',
      controller: 'insuranceFeeModalController',
      controllerAs: '$ctrl',
      resolve: {
        modalData: function() {
          return modalData;
        }
      }
    });
  }
}
