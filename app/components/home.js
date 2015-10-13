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

      //TODO:START: Test feed urls, when finished delete this blocks
      $scope.urlArray = ['http://feeds.feedburner.com/TEDTalks_video', 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/'];

      $scope.addUrl = function() {
        $scope.urlArray.push("http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/?time=" + new Date().getTime());
      }

      $scope.removeUrl = function() {
        $scope.urlArray.pop();
      }
      //TODO:END

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
})();
