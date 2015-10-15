(function() {
  'use strict';
  google.load("feeds", "1");

  angular
    .module('app', [
      'ui.router',
      'ngSanitize',
      'firebase',
      'firebaseRef.service',
      'dataShare.service',
      'arrayFilter.service',
      'localStorage.factory',
      'feedManage.factory',
      'google.factory',
      'RSS.Feeds',
      'RSS.Feeds.directive',
      'RSS.List.directive',
      'RSS.Settings.directive',
      'app.home'
    ])
    .config(appConfig);

  // @ngInject
  function appConfig($urlRouterProvider) {
    console.log('=== App Config ===');

    $urlRouterProvider.otherwise('/');

  }
})();
