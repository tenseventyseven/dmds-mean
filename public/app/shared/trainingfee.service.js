"use strict";

angular
  .module("app")

  .factory("trainingFeeService", trainingFeeService);

function trainingFeeService($http) {
  var service = {
    getTrainingFee: getTrainingFee,
    getTrainingFeesByMember: getTrainingFeesByMember,
    createTrainingFee: createTrainingFee,
    updateTrainingFee: updateTrainingFee,
    deleteTrainingFee: deleteTrainingFee,
  };

  return service;

  // get a single training fee
  function getTrainingFee(id) {
    return $http.get("/api/trainingfee/" + id);
  }

  // get all training fees by member
  function getTrainingFeesByMember(memberId) {
    return $http.get("/api/trainingfee/member/" + memberId);
  }

  // create a training fee
  function createTrainingFee(trainingFeeData) {
    return $http.post("/api/trainingfee/", trainingFeeData);
  }

  // update a training fee
  function updateTrainingFee(id, trainingFeeData) {
    return $http.put("/api/trainingfee/" + id, trainingFeeData);
  }

  // delete a training fee
  function deleteTrainingFee(id) {
    return $http.delete("/api/trainingfee/" + id);
  }
}
