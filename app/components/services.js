(function() {
  'use strict';

  angular
    .module('RSS.Feeds', [])
    .constant("firebaseUrl", "https://rss-feed.firebaseio.com/")
    .constant("firebaseType", "feed")
    .service('fire', fireFn)
    .factory('feedsFactory', feedsFactoryFn)
    .factory('feedManage', feedManageFn)
    .provider('manageRssList', manageRssListFn)
    .provider('displayRssFeed', displayRssFeedFn);

    //@ngInject
    function fireFn(firebaseUrl) {
      var ref = new Firebase(firebaseUrl);

      this.getRef = ref;
    }

    //@ngInject
    function feedManageFn(fire, feedsFactory, $firebaseObject, $firebaseArray) {
      var obj = {
        addFeed: addFeed,
        getFeeds: getFeeds,
        getFeedContent: getFeedContent,
        removeFeed: removeFeed,
        saveFeed: saveFeed
      };

      var ref = fire.getRef;

      return obj;

      function addFeed(_name, _obj) {
        var list = $firebaseArray(ref.child(_name));

        list.$add(_obj);
      }

      function getFeeds(_name) {
        var fbObjs = $firebaseArray(ref.child(_name));

        return fbObjs;
      }

      function getFeedContent(_name, _url, _params) {
        // var fbObj = $firebaseObject(ref.child(_name).child(_id));

        return feedsFactory.getRss(_url);
      }

      function removeFeed(_name, _id) {
        return $firebaseObject(ref.child(_name).child(_id)).$remove();
      }

      function saveFeed(_name, _id, _params) {
        var fbObj = $firebaseObject(ref.child(_name).child(_id));

        fbObj.name = _params.name;
        fbObj.url = _params.url;
        fbObj.$save();
      }
    }

    //@ngInject
    function feedsFactoryFn($q, $rootScope) {
      var obj = {};

      obj.getRss = function(url) {
        var feed = new google.feeds.Feed(url);
        var d = $q.defer();
        //feed.setNumEntries(1);
        feed.load(function(result) {
          $rootScope.$apply(d.resolve(result.feed.entries));
        });
        return d.promise;
      };

      return obj;
    }

    //@ngInject
    function manageRssListFn(firebaseType) {
      return {
        $get: $get
      }

      function $get(feedManage) {
        return {
          addRss: addRss,
          deleteRss: deleteRss,
          editRss: editRss,
          getRssList: getRssList
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
