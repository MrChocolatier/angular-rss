(function() {
  'use strict';

  angular
    .module('RSS.List.directive', [])
    .directive('rssList', rssListDirective);

    //@ngInject
    function rssListDirective(feedManage, manageRssList, dataShare) {
      return {
        templateUrl: 'components/rssList/index.html',
        link: function(scope, element, attrs) {
          feedManage.getFeeds('feed').then(function(result) {
            scope.rssList = result;
          });

          scope.entryChange = function(_boolean, _id) {

          };
            //scope.rssList = manageRssList.getRssList();
            //scope.dataShare = dataShare;
            //dataShare.feed = manageRssList.selectedRss();
            //
            //scope.add = function() {
            //  scope.rssList = manageRssList.addRss({
            //    name: scope.name,
            //    url: scope.url
            //  });
            //
            //  scope.name = '';
            //  scope.url = '';
            //}
            //
            //scope.delete = function(id, url) {
            //  scope.rssList = manageRssList.deleteRss(id, url);
            //}
            //
          scope.edit = function(_obj) {
            console.log(_obj);
          };
            //
            //scope.select = function(feed) {
            //  manageRssList.selectedRss(feed);
            //  dataShare.feed = feed;
            //}
            //
            //function getRssObjIndex(list, url) {
            //  var index;
            //  list.some(function(entry, i) {
            //    if (entry.url === url) {
            //        index = i;
            //        return true;
            //    }
            //  });
            //
            //  return index;
            //}
        }
      }
    }
})();
