(function() {
  'use strict';

  angular
    .module('RSS.Feeds', [])
    .provider('manageRssList', manageRssListFn)
    .provider('displayRssFeed', displayRssFeedFn);

    //@ngInject
    function manageRssListFn(firebaseType) {
      return {
        $get: $get
      }

      function $get(feedManage, dataShare) {
        return {
          addRss: addRss,
          deleteRss: deleteRss,
          editRss: editRss,
          getRssList: getRssList,
          selectedRss: selectedRss
        }

        function addRss(rssObj) {
          return feedManage.addFeed(firebaseType, rssObj);
        }

        function deleteRss(id, url) {
          return feedManage.removeFeed(firebaseType, id, url);
        }

        function editRss(id, oldUrl, rssObj) {
          return feedManage.saveFeed(firebaseType, id, oldUrl, rssObj);
        }

        function getRssList() {
          return feedManage.getFeeds(firebaseType);
        }

        function selectedRss(rss) {
          return feedManage.selectedFeed(rss);
        }
      }
    }

    //@ngInject
    function displayRssFeedFn(firebaseType) {
      return {
        $get: $get
      }

      function $get(feedManage) {
        return {
          showFeed: showFeed
        }

        function showFeed(url, options) {
          return feedManage.getFeedContent(firebaseType, url, options);
        }
      }
    }
})();
