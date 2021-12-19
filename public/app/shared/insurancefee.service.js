"use strict";

angular
  .module("app")

  .factory("insuranceFeeService", insuranceFeeService);

function insuranceFeeService($http) {
  var service = {
    getInsuranceFee: getInsuranceFee,
    getInsuranceFeesByMember: getInsuranceFeesByMember,
    createInsuranceFee: createInsuranceFee,
    updateInsuranceFee: updateInsuranceFee,
    deleteInsuranceFee: deleteInsuranceFee,
  };

  return service;

  // get a single insurance fee
  function getInsuranceFee(id) {
    return $http.get("/api/insurancefee/" + id);
  }

  // get all insurance fees by member
  function getInsuranceFeesByMember(memberId) {
    return $http.get("/api/insurancefee/member/" + memberId);
  }

  // create a insurance fee
  function createInsuranceFee(InsuranceFeeData) {
    return $http.post("/api/insurancefee/", InsuranceFeeData);
  }

  // update a insurance fee
  function updateInsuranceFee(id, InsuranceFeeData) {
    return $http.put("/api/insurancefee/" + id, InsuranceFeeData);
  }

  // delete a insurance fee
  function deleteInsuranceFee(id) {
    return $http.delete("/api/insurancefee/" + id);
  }
}
