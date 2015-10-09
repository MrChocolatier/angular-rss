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
          selectRss: selectRss
        }

        function addRss(rssObj) {
          feedManage.addFeed(firebaseType, rssObj);
        }

        function deleteRss(id) {
          feedManage.removeFeed(firebaseType, id);
        }

        function editRss(id, rssObj) {
          feedManage.saveFeed(firebaseType, id, rssObj);
        }

        function getRssList() {
          return feedManage.getFeeds(firebaseType);
        }

        function selectRss(url) {
          dataShare.feed.url = url;
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
