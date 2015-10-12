(function() {
  'use strict';

  angular
    .module('RSS.Feeds.directive', [])
    .directive('rssFeed', rssFeedFn);

    //@ngInject
    function rssFeedFn(dataShare) {
      return {
        templateUrl: 'components/rssFeed/rssFeed.html',
        scope: {
          feedData: '=',
          urlArray: '=',        // test
          addUrl: '&',          // test
          removeUrl: '&'        // test
        },
        link: function(scope, element, attrs, ctrl) {
          // var url = 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/';
          // scope.data = dataShare;
          //
          // scope.$watch('data.feed.url', function(newUrl, oldUrl) {
          //   if (newUrl)
          //     displayRssFeed.showFeed(newUrl, options).then(function(result) {
          //       scope.feedContent = result;
          //     });
          // })
        }
      }
    }
})();
