(function() {
    'use strict';

    angular
    .module('app.home', [])
    .config(homeConfigFn);

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
        })
    };

    //@ngInject
    function homeCtrlFn($scope, dataShare, displayRssFeed, feedManage, arrayFilter) {
        console.log('=== Home Controller ===');
        window.scope = $scope;
        var log = [];
        var vm = this;
        $scope.urlArray = [];

        feedManage.getFeeds('feed').then(function(result) {
            angular.forEach(result, function(value, key) {
                if (value.show) {
                    log.push(value.url);
                }
            });
            $scope.urlArray = log;
        });

        // feed data for rssFeed directive to render
        $scope.feedData = [];
        $scope.settings = dataShare.settings;

        $scope.$on('settings:changed', function(e, data) {
            $scope.settings = data;
        });

        $scope.$watch('[urlArray, settings]', function(newArray, oldArray) {
            var update = arrayFilter.filterNew(newArray, oldArray, $scope.feedData.length);

            // Removing old entries if setting or their urls changed
            if (update.refresh)
            $scope.feedData = [];

            // Getting data for each new or changed url
            update.urls.forEach(function(el) {
                displayRssFeed.showFeed(el, newArray[1]).then(function(result) {
                    result.entries.forEach(function(el) {
                        el.publishedDate = new Date(el.publishedDate);
                        el.source = result.title;
                    })
                    $scope.feedData = $scope.feedData.concat(result.entries);
                });
            })
        }, true);
    }

    //@ngInject
    function feedsCtrlFn() {

    }
})();
