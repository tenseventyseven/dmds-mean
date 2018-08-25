"use strict";

angular.module('app')

  .factory('activityService', activityService);

function activityService() {
  var service = {
    getClassActivities: getClassActivities,
    getOtherActivities: getOtherActivities
  };

  return service;

  // get all class activities
  function getClassActivities() {
    // TODO: make API request
    return ['Boxing',
      'Brazilian Jiu Jitsu',
      'Fighters',
      'Kick Boxing/Muay Thai',
      'Ladies Only'
    ];
  }

  // get all other activities
  function getOtherActivities() {
    // TODO: make API request
    return ['Boot Camp',
      'Casual',
      'Gym',
      'Personal Training',
      'Sparring'
    ];
  }
}
