(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .controller(feedsListCtrlFn)
    .directive('manageRssList', feedsListDirectiveFn);

    //@ngInject
    function feedsListCtrlFn($stateParams) {
      var vm = this;

      vm.title = $stateParams.item;
    }

    //@ngInject
    function feedsListDirectiveFn(rssFactory) {
      return {
        templateUrl: 'components/manageRssList/manageRssList.html',
        link: function(scope, element, attrs) {
            //Todo: get data somehow
            var data = [
              {
                  name: "TED talks",
                  url: 'http://feeds.feedburner.com/TEDTalks_video',
              },
              {
                  name: "National geographic",
                  url: 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/',
              },
              {
                  name: "Craigslist",
                  url: 'http://sfbay.craigslist.org/eng/index.rss',
              },
              {
                  name: "Slate",
                  url: 'http://www.slate.com/blogs/trending.fulltext.all.10.rss'
              }
            ];

            scope.rss_list = data;

            scope.delete = function(url) {
              var index = getRssObjIndex(scope.rss_list, url);
              scope.rss_list.splice(index, 1);

              //Todo: somehow save rss_list
            }

            scope.edit = function(url) {
              if (!scope.current_edit || scope.current_edit.url != url) {
                var index = getRssObjIndex(scope.rss_list, url);
                scope.current_edit = {
                  url: scope.rss_list[index].url,
                  name: scope.rss_list[index].name
                };
              } else {
                scope.current_edit = false;

                //Todo: somehow save rss_list
              }
            }

            scope.add = function(url) {
              scope.rss_list.push({
                name: scope.name,
                url: scope.url
              });

              scope.name = '';
              scope.url = '';

              //Todo: somehow save rss_list
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
