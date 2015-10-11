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

      storage.setRss = function(newRss, url) {
        var rssList = storage.getRssList();
        if (rssList) {
          if (url) {
            findRss(rssList, url, newRss);
          } else {
            rssList.push(newRss);
          }
          return storage.setRssList(rssList);
        }
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

          rssList.splice(ind, 1);
          return storage.setRssList(rssList);
        }
      }

      storage.selectedFeed = function(rss) {
        if (storageAvailable('localStorage')) {
          if (rss) {
            $window.localStorage.setItem('rss_selectedFeed', JSON.stringify(rss));
            return true;
          } else {
            return JSON.parse($window.localStorage.getItem('rss_selectedFeed'));
          }
        } else {
          console.error('localStorage in unavailable!')
          return false;
        }
      }

      function findRss(rssList, url, newRss) {
        var rss;
        var ind;

        rssList.some(function(entry, i, array) {
          if (entry.url === url) {
            if (newRss) {
              array[i] = newRss;
              rss = entry;
            } else {
              rss = entry;
              ind = i;
            }
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
