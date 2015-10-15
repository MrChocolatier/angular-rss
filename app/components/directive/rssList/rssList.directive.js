(function() {
  'use strict';

  angular
    .module('RSS.List.directive', [])
    .directive('rssList', rssListDirective);

    //@ngInject
    function rssListDirective(feedManage) {
      return {
        templateUrl: 'components/directive/rssList/index.html',
        controller: function() {
          feedManage.getFeeds('feed').then(function(result) {
            scope.rssList = result;
          });
        }
      }
    }
})();
