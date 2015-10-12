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
    function homeCtrlFn($scope, displayRssFeed) {
      console.log('=== Home Controller ===');
      var vm = this;

      // test feed urls
      $scope.urlArray = ['http://feeds.feedburner.com/TEDTalks_video', 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/'];

      $scope.addUrl = function() {
        $scope.urlArray.push("http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/?time=" + new Date().getTime());
      }

      $scope.removeUrl = function() {
        $scope.urlArray.pop();
      }

      // feed data for rssFeed directive to render
      $scope.feedData = [];
      $scope.options = {};

      $scope.$watch('urlArray', function(newArray, oldArray) {
        if (newArray) {
          if ($scope.feedData.length === 0)  {  // initial function run
            newArray.forEach(function(el) {
              displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                  $scope.feedData = $scope.feedData.concat(result);
              });
            })
          } else {
            if (newArray.length <= oldArray.length) {   // if url was deleted or modified
              newArray.forEach(function(el) {
                displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                    $scope.feedData = result;
                });
              })
            } else {
              var newUrls = newArray.filter(function(n) {
                return oldArray.indexOf(n) === -1;
              });

              newUrls.forEach(function(el) {
                displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                    $scope.feedData = $scope.feedData.concat(result);
                });
              })
            }
          }
        }
      }, true)
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
