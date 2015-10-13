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

      function getRss(url) {
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
