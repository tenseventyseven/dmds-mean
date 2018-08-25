"use strict";

angular.module('app')

  .factory('popupModalService', popupModalService);

function popupModalService($uibModal, $log) {
  var service = {
    openModal: openModal
  };

  return service;

  // open a modal
  function openModal(modalData) {
    return $uibModal.open({
      animation: true,
      templateUrl: 'app/components/checkin/popup.modal.view.html',
      controller: 'popupModalController',
      controllerAs: '$ctrl',
      resolve: {
        modalData: function() {
          return modalData;
        }
      }
    });
  }
}
