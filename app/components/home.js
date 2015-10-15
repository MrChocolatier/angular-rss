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
        // .state('home', {
        //     url: '/',
        //     views: {
        //         'content': {
        //             templateUrl: "components/home.html",
        //             controller: homeCtrlFn,
        //             controllerAs: 'hc'
        //         },
        //         'sidebar': {
        //             templateUrl: "components/menu.html",
        //             controller: sidebarCtrlFn
        //         }
        //     }
        // })
        .state('feeds', {
            url: '/feeds',
            templateUrl: 'components/feeds.html',
            controller: feedsCtrlFn
        })
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
        $scope.settings = dataShare.settings;

        $scope.$on('settings:changed', function(e, data) {
            $scope.settings = data;
            console.log(data);
        })

        $scope.$watchGroup(['urlArray', 'settings'], function(newArray, oldArray) {
            var newUrls = arrayFilter.filterNew(newArray[0], oldArray[0], $scope.feedData.length);

            if (newArray[0].length <= oldArray[0].length)
                $scope.feedData = [];

            newUrls.forEach(function(el) {
                displayRssFeed.showFeed(el, newArray[1]).then(function(result) {
                    result.forEach(function(el) {
                        el.publishedDate = new Date(el.publishedDate);
                    })
                    $scope.feedData = $scope.feedData.concat(result);
                });
            })
        })

        // $scope.$watch('urlArray', function(newArray, oldArray) {
        //     var newUrls = arrayFilter.filterNew(newArray, oldArray, $scope.feedData.length);
        //
        //     if (newArray.length <= oldArray.length)
        //         $scope.feedData = [];
        //
        //     newUrls.forEach(function(el) {
        //         displayRssFeed.showFeed(el, $scope.settings).then(function(result) {
        //             result.forEach(function(el) {
        //                 el.publishedDate = new Date(el.publishedDate);
        //             })
        //             $scope.feedData = $scope.feedData.concat(result);
        //         });
        //     })
        // }, true)
    }

    //@ngInject
    function feedsCtrlFn() {

    }
})();
