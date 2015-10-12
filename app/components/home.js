(function() {
  'use strict';

  angular
    .module('app.home', [])
    .config(homeConfigFn)

    //@ngInject
    function homeConfigFn($stateProvider) {
      console.log('=== Home Config ===');
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: "components/home.html",
          controller: homeCtrlFn,
          controllerAs: 'hc'
        });
    };

    //@ngInject
    function homeCtrlFn($scope) {
      console.log('=== Home Controller ===');
      var vm = this;

      $scope.array = ['one', 'two']
      vm.clickMe = function() {
        alert('click');
      }
      // console.log('=== Home Controller ===');
      //
      // var feedList = [
      //   'http://feeds.feedburner.com/TEDTalks_video',
      //   'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/',
      //   'http://sfbay.craigslist.org/eng/index.rss',
      //   'http://www.slate.com/blogs/trending.fulltext.all.10.rss',
      //   'http://feeds.current.com/homepage/en_US.rss',
      //   'http://feeds.current.com/items/popular.rss',
      //   'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
      // ];

      // vm.fire = feedManage.getFeeds('feed');
      // feedManage.addFeed('feed');

      // feedsFactory.getRss(feedList[1]).then(function(result) {
      //   vm.rssFirst = result;
      // });
    }
})();
