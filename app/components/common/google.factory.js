(function() {
  'use strict';

  angular
    .module('google.factory', [])
    .factory('googleFactory', googleFactoryFn)

    //@ngInject
    function googleFactoryFn($q, $rootScope) {
      var obj = {
        getRss: getRss
      };

      function getRss(url, options) {
        var feed = new google.feeds.Feed(url);

        if (options && options.hasOwnProperty("entriesNumber"))
            feed.setNumEntries(options.entriesNumber);
        if (options && options.includeHistoricalEntries)
            feed.includeHistoricalEntries();

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
