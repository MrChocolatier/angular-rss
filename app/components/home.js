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
    function homeCtrlFn($scope, dataShare, displayRssFeed, feedManage, arrayFilter) {
        console.log('=== Home Controller ===');
        var log = [];
        var vm = this;

        feedManage.getFeeds('feed').then(function(result) {
            angular.forEach(result, function(value, key) {
                if (value.show) {
                    log.push(value.url);
                }
            });
        });
        $scope.urlArray = log;
        // feed data for rssFeed directive to render
        $scope.feedData = [];
        $scope.options = {};

        $scope.$watch('urlArray', function(newArray, oldArray) {
            if (newArray) {
                var newUrls = arrayFilter.filterNew(newArray, oldArray, $scope.feedData.length);

                if (newArray <= oldArray)
                    $scope.feedData = [];

                newUrls.forEach(function(el) {
                    displayRssFeed.showFeed(el, $scope.options).then(function(result) {
                        result.forEach(function(el) {
                            el.publishedDate = new Date(el.publishedDate);
                        })
                        $scope.feedData = $scope.feedData.concat(result);
                    });
                })
            }
        }, true)
    }

    //@ngInject
    function feedsCtrlFn() {

    }
})();
