"use strict";

angular
  .module("app")

  .factory("sessionService", sessionService);

function sessionService() {
  var service = {
    getSession: getSession,
  };

  return service;

  // get session for a given time
  function getSession(time) {
    var session = "";
    var hour = time.getHours();

    switch (hour) {
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        session = "Morning";
        break;
      case 11:
      case 12:
      case 13:
        session = "Lunchtime";
        break;
      case 14:
      case 15:
      case 16:
        session = "Afternoon";
        break;
      case 17:
      case 18:
      case 19:
        session = "Evening";
        break;
      default:
        session = "Night";
    }

    return session;
  }
}
