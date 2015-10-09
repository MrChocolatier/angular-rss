(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .directive('rssList', rssListFn);

    //@ngInject
    function rssListFn(manageRssList, dataShare) {
      return {
        templateUrl: 'components/rssList/rssList.html',
        link: function(scope, element, attrs) {
            scope.rssList = manageRssList.getRssList();
            scope.dataShare = dataShare;

            scope.add = function() {
              scope.rssList = manageRssList.addRss({
                name: scope.name,
                url: scope.url
              });

              scope.name = '';
              scope.url = '';
            }

            scope.delete = function(id) {
              scope.rssList = manageRssList.deleteRss(id);
            }

            scope.edit = function(url, id) {
              if (!scope.current_edit || scope.current_edit.url != url) {
                var index = getRssObjIndex(scope.rssList, url);
                scope.current_edit = {
                  url: scope.rssList[index].url,
                  name: scope.rssList[index].name
                };
              } else {
                scope.rssList = manageRssList.editRss(id, scope.current_edit);
                scope.current_edit = false;
              }
            }

            scope.select = function(feed) {
              // manageRssList.selectRss(url);
              dataShare.feed = feed;
            }

            function getRssObjIndex(list, url) {
              var index;
              list.some(function(entry, i) {
                if (entry.url === url) {
                    index = i;
                    return true;
                }
              });

              return index;
            }
        }
      }
    }
})();
