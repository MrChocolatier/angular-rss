(function() {
    'use strict';

    angular
    .module('arrayFilter.service', [])
    .service('arrayFilter', arrayFilter);

    function arrayFilter(displayRssFeed) {
        this.filterNew = function(newArray, oldArray, dataLength) {
            if (dataLength === 0)  {  // initial function run
                return newArray;
            } else {
                var newUrls = newArray.filter(function(el) {
                    return oldArray.indexOf(el) === -1;
                });

                return newUrls;
            }
        }
    }
})();
