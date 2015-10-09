(function() {
  'use strict';

  angular
    .module('RSS.Feeds')
    .constant("localStorageKey", "rss")
    .service('localStorage', localStorageFn);

    //#ngInject
    function localStorageFn($window) {
      var storage = this;

      storage.setRssList = function(rssList) {
        if (storageAvailable('localStorage')) {
          $window.localStorage.setItem('rss', JSON.stringify(rssList));
          return rssList;
        } else {
          console.error('localStorage in unavailable!')
          return false;
        }
      }

      storage.getRssList = function() {
        if (storageAvailable('localStorage')) {
          var rss = $window.localStorage.getItem('rss');

          if (rss && rss != 'undefined')
            return JSON.parse(rss);
          else
            $window.localStorage.setItem('rss', JSON.stringify([]));
            return [];
        } else {
          console.error('localStorage in unavailable!')
          return false;
        }
      }

      storage.setRss = function(rss) {
        var rssList = storage.getRssList();
        if (rssList) {
          findRss(rssList, rss.url, rss);  // url as id
        } else {
          rssList.push(rss);
        }

        storage.setRssList(rssList);
      }

      storage.getRss = function(url) {
        var rssList = storage.getRssList();
        if (rssList) {
          return findRss(rssList, url).rss;
        }
      }

      storage.deleteRss = function(url) {
        var rssList = storage.getRssList();
        if (rssList) {
          var ind = findRss(rssList, url).index;

          rssList.splice(index, 1);
          storage.setRssList(rssList);
        }
      }

      function findRss(rssList, url, newRss) {
        var rss;
        var ind;

        rssList.some(function(entry, i) {
          if (newRss)
            if (entry.url === url) {
                entry = newRss;
                rss = entry;
                return true;
            }
          else
            if (entry.url === url) {
                rss = entry;
                ind = i;
                return true;
            }
        });

        return {
          rss: rss,
          index: ind
        }
      }

      function storageAvailable(type) {
        try {
      		var storage = window[type],
      			x = '__storage_test__';
      		storage.setItem(x, x);
      		storage.removeItem(x);
      		return true;
      	}
      	catch(e) {
      		return false;
      	}
      }

    }
})();
