(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .directive('rssList', rssListFn);

    //@ngInject
    function rssListFn(manageRssList) {
      return {
        templateUrl: 'components/rssList/rssList.html',
        link: function(scope, element, attrs) {
            scope.rss_list = manageRssList.getRssList();

            scope.add = function(url) {
              manageRssList.addRss({
                name: scope.name,
                url: scope.url
              });

              scope.name = '';
              scope.url = '';
            }

            scope.delete = function(id) {
              manageRssList.deleteRss(id);
            }

            scope.edit = function(url, id) {
              if (!scope.current_edit || scope.current_edit.url != url) {
                var index = getRssObjIndex(scope.rss_list, url);
                scope.current_edit = {
                  url: scope.rss_list[index].url,
                  name: scope.rss_list[index].name
                };
              } else {
                manageRssList.editRss(id, scope.current_edit);
                scope.current_edit = false;
              }
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
