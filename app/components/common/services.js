(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .constant("firebaseUrl", "https://rss-feed.firebaseio.com/")
    .constant("firebaseType", "feed")
    .service('fire', fireFn)
    .service('dataShare', dataShareFn)
    .factory('feedsFactory', feedsFactoryFn)
    .factory('feedManage', feedManageFn);

    //@ngInject
    function dataShareFn() {
      var share = this;

      share.feed = {
          url: '',
          name: ''
      };
    }

    //@ngInject
    function fireFn(firebaseUrl) {
      var ref = new Firebase(firebaseUrl);

      this.getRef = ref;
    }

    //@ngInject
    function feedManageFn(fire, feedsFactory, $firebaseObject, $firebaseArray, localStorage) {
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
        // var list = $firebaseArray(ref.child(_name));

        // list.$add(_obj);

        localStorage.setRss(_obj);
      }

      function getFeeds(_name) {
        // var fbObjs = $firebaseArray(ref.child(_name));

        // return fbObjs;

        return localStorage.getRssList();
      }

      function getFeedContent(_name, _url, _params) {
        // var fbObj = $firebaseObject(ref.child(_name).child(_id));

        return feedsFactory.getRss(_url);
      }

      function removeFeed(_name, _id, _url) {
        // return $firebaseObject(ref.child(_name).child(_id)).$remove();

        localStorage.deleteRss(_url);
      }

      function saveFeed(_name, _id, _params) {
        // var fbObj = $firebaseObject(ref.child(_name).child(_id));

        // fbObj.name = _params.name;
        // fbObj.url = _params.url;
        // fbObj.$save();

        localStorage.setRss({
          name: _params.name,
          url: _params.url
        });
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
})();
