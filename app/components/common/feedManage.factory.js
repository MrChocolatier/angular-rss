(function() {
  'use strict';

  angular
    .module('feedManage.factory', [])
    .factory('feedManage', feedManageFn)

    //@ngInject
    function feedManageFn(DBC, $firebaseObject, $firebaseArray) {
      var ref = DBC.getRef;

      var obj = {
        addFeed: addFeed,
        getFeeds: getFeeds,
        getFeedContent: getFeedContent,
        removeFeed: removeFeed,
        saveFeed: saveFeed,
        selectedFeed: selectedFeed
      };

      function addFeed(_name, _obj) {
        // var url = _name === _name ? ref.child(_name) : ref;
        // console.log(url);
        var list = $firebaseArray(ref.child(_name));
        list.$add(_obj);
      }

      function getFeeds(_name) {
        var url = _name ? ref.child(_name) : ref;
        var fbObjs = $firebaseArray(ref.child(_name));

        return fbObjs.$loaded();
      }

      function getFeedContent(_name, _url, _params) {
        var fbObj = $firebaseObject(ref.child(_name));

        return fbObj;
      }

      function removeFeed(_name, _id, _url) {
        // return $firebaseObject(ref.child(_name).child(_id)).$remove();

        return localStorage.deleteRss(_url);
      }

      function saveFeed(_name, _id, _oldUrl, _params) {
        // var fbObj = $firebaseObject(ref.child(_name).child(_id));

        // fbObj.name = _params.name;
        // fbObj.url = _params.url;
        // fbObj.$save();

        return localStorage.setRss({
          name: _params.name,
          url: _params.url
        }, _oldUrl);
      }

      function selectedFeed(_rss) {
        return localStorage.selectedFeed(_rss);
      }

      return obj;
    }
})();
