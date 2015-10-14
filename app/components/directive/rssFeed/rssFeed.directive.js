(function() {
  'use strict';

  angular
    .module('RSS.Feeds.directive', [])
    .directive('rssFeed', rssFeedsDirective);

    //@ngInject
    function rssFeedsDirective(dataShare) {
      return {
        templateUrl: 'components/directive/rssFeed/index.html',
        scope: {
          feedData: '='
        },
        link: function(scope, element, attrs) {

        }
      }
    }
})();
