"use strict";

angular.module('app')

  .factory('confirmModalService', confirmModalService);

function confirmModalService($uibModal, $log) {
  var service = {
    openModal: openModal
  };

  return service;

  // open a modal
  function openModal(modalData) {
    return $uibModal.open({
      animation: true,
      templateUrl: 'app/components/admin/confirm.modal.view.html',
      controller: 'confirmModalController',
      controllerAs: '$ctrl',
      resolve: {
        modalData: function() {
          return modalData;
        }
      }
    });
  }
}
