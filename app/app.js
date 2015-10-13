(function() {
  'use strict';
  google.load("feeds", "1");

  angular
    .module('app', [
      'ui.router',
      'ngSanitize',
      'dataShare.service',
      'localStorage.factory',
      'feedManage.factory',
      'google.factory',
      'RSS.Feeds',
      'RSS.Feeds.directive',
      'app.home',
      'firebase',
      'firebaseRef.service',
      'localStorage.factory'
    ])
    .config(appConfig);

  // @ngInject
  function appConfig($urlRouterProvider) {
    console.log('=== App Config ===');

    $urlRouterProvider.otherwise('/');

  }
})();
