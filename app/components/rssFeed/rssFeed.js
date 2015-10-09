(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .directive('rssFeed', rssFeedFn);

    //@ngInject
    function rssFeedFn(displayRssFeed, dataShare) {
      return {
        templateUrl: 'components/rssFeed/rssFeed.html',
        link: function(scope, element, attrs) {
          var options = {};
          // var url = 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/';
          scope.data = dataShare;

          scope.$watch('data.feed.url', function(newUrl, oldUrl) {
            if (newUrl)
              displayRssFeed.showFeed(newUrl, options).then(function(result) {
                scope.feedContent = result;
              });
          })
        }
      }
    }
})();
