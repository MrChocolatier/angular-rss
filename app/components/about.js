(function() {
  'use strict';

  angular
    .module('app.about', [])
    .config(appConfig);

  // @ngInject
  function appConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'components/about.html',
        //controller: aboutCtrlFn,
        //controllerAs: 'ac'
      })
      .state('about.item', {
        url: '/:item',
        templateUrl: 'components/about.html',
        controller: aboutCtrlFn,
        controllerAs: 'ac'
      });
  }

  //@ngInject
  function aboutCtrlFn($stateParams) {
      var vm = this;

      vm.title = $stateParams.item;
  }
})();
