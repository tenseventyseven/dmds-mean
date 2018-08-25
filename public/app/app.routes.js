"use strict";

angular.module('appRoutes', [])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

      // home page
      .when('/checkin', {
        templateUrl: 'app/components/checkin/checkin.view.html',
        controller: 'checkinController'
      })

      // admin page
      .when('/admin', {
        templateUrl: 'app/components/admin/admin.view.html',
        controller: 'adminController'
      });

    $locationProvider.html5Mode(true);

  }]);
