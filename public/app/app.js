"use strict";

angular.module('app', [
    'ui.bootstrap',
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'appRoutes',
    'listGroup'
  ])

  // lodash support
  .constant('_', window._);
