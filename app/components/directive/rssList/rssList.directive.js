(function() {
  'use strict';

  angular
    .module('RSS.List.directive', [])
    .directive('rssList', rssListDirective);

    //@ngInject
    function rssListDirective(feedManage) {
      return {
        scope: {},
        templateUrl: function(tElem, tAttrs) {

          return tAttrs['template'] === 'list'
            ? 'components/directive/rssList/list.html'
            : 'components/directive/rssList/index.html'
        },
        controller: function($scope) {
          feedManage.getFeeds('feed').then(function(result) {
            $scope.rssList = result;
          });
        }
      }
    }
})();
