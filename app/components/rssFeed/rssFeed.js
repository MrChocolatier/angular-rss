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
        }
      }
    }
})();
