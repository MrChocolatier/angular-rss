(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .directive('rssFeed', rssFeedFn);

    //@ngInject
    function rssFeedFn(displayRssFeed) {
      return {
        templateUrl: 'components/rssFeed/rssFeed.html',
        link: function(scope, element, attrs) {
          var options = {};
          var url = 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/';

          displayRssFeed.showFeed(url, options).then(function(result) {
            scope.feedContent = result;
          });
        }
      }
    }
})();
