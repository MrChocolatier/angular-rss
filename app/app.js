(function() {
  'use strict';
  google.load("feeds", "1");

  angular
    .module('app', [
      'ui.router',
      'RSS.Feeds',
      'ngSanitize'
    ])
    .config(appConfig);

  // @ngInject
  function appConfig($stateProvider, $urlRouterProvider) {
    console.log('=== Start Config ===');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home.html',
        controller: homeCtrlFn,
        controllerAs: 'hc'
      });
  }

  //@ngInject
  function homeCtrlFn(rssFactory) {
    var vm = this;
    console.log('=== Home Controller ===');

    var feedList = [
      'http://feeds.feedburner.com/TEDTalks_video',
      'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/',
      'http://sfbay.craigslist.org/eng/index.rss',
      'http://www.slate.com/blogs/trending.fulltext.all.10.rss',
      'http://feeds.current.com/homepage/en_US.rss',
      'http://feeds.current.com/items/popular.rss',
      'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    ];

    rssFactory.getRss(feedList[1]).then(function(result) {
      vm.rssFirst = result;
    });
  }
})();