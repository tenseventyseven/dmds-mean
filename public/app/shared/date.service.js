"use strict";

angular
  .module("app")

  .factory("dateService", dateService);

function dateService() {
  var service = {
    getExpiryDate: getExpiryDate,
  };

  return service;

  // get expiry date given (start date, months)
  function getExpiryDate(startDate, months) {
    // Add months to date
    var expiryDate = new Date(startDate);
    expiryDate.setMonth(expiryDate.getMonth() + months);

    // Go back a day for expiry date
    expiryDate.setDate(expiryDate.getDate() - 1);

    return expiryDate;
  }
}
