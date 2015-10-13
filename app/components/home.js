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
        })
        .state('feeds', {
          url: '/feeds',
          templateUrl: 'components/feeds.html',
          controller: feedsCtrlFn
        });
    };

    //@ngInject
    function homeCtrlFn($scope, dataShare, displayRssFeed, feedManage) {
      console.log('=== Home Controller ===');
      var log = [];
      var vm = this;

      feedManage.getFeeds('feed').then(function(result) {
          var values = result;
          angular.forEach(values, function(value, key) {
            log.push(value.url);
          });
      });
      $scope.urlArray = log;
      // feed data for rssFeed directive to render
      $scope.feedData = [];
      $scope.options = {};

      $scope.$watch('urlArray', function(newArray, oldArray) {
        if (newArray) {
          if ($scope.feedData.length === 0)  {  // initial function run
            newArray.forEach(function(el) {
              displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                  result.forEach(function(el) {
                    el.publishedDate = new Date(el.publishedDate);
                  })
                  $scope.feedData = $scope.feedData.concat(result);
              });
            })
          } else {
            if (newArray.length <= oldArray.length) {   // if url was deleted or modified
              newArray.forEach(function(el) {
                displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                    result.forEach(function(el) {
                      el.publishedDate = new Date(el.publishedDate);
                    })
                    $scope.feedData = result;
                });
              })
            } else {
              var newUrls = newArray.filter(function(n) {
                return oldArray.indexOf(n) === -1;
              });

              newUrls.forEach(function(el) {
                displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                    result.forEach(function(el) {
                      el.publishedDate = new Date(el.publishedDate);
                    })
                    $scope.feedData = $scope.feedData.concat(result);
                });
              })
            }
          }
        }
      }, true)
    }

    //@ngInject
    function feedsCtrlFn() {

    }
})();
