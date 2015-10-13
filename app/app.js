(function() {
  'use strict';
  google.load("feeds", "1");

  angular
    .module('app', [
      'ui.router',
      'ngSanitize',
      'localStorage.factory',
      'dataShare.service',
      'RSS.Feeds.directive',
      'app.home',
    ])
    .config(appConfig);

  // @ngInject
  function appConfig($urlRouterProvider) {
    console.log('=== App Config ===');

    $urlRouterProvider.otherwise('/');

  }
})();
