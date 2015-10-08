(function() {
  'use strict';
  google.load("feeds", "1");

  angular
    .module('app', [
      'ui.router',
      'RSS.Feeds',
      'ngSanitize',
      'app.about',
      'firebase'
    ])
    .config(appConfig);

  // @ngInject
  function appConfig($stateProvider, $urlRouterProvider) {
    console.log('=== Start Config ===');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          "headerView": {
            templateUrl: "components/header/header.html"
          },
          "menuView": {
            templateUrl: "components/rssList/menu.html"
          },
          "rssFeedView": {
            templateUrl: "components/rssFeed/feed.html",
            controller: homeCtrlFn,
            controllerAs: 'hc'
          }
        }
      });
  }

  //@ngInject
  function homeCtrlFn(feedsFactory, feedManage) {
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

    // vm.fire = feedManage.getFeeds('feed');
    // feedManage.addFeed('feed');

    feedsFactory.getRss(feedList[1]).then(function(result) {
      vm.rssFirst = result;
    });
  }
})();
