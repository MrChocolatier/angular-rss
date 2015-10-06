(function() {
  'use strict';

  angular
    .module('RSS.Feeds', [])
    .factory('rssFactory', feedsFactoryFn);

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