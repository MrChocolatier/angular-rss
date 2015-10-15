(function() {
    'use strict';

    angular
    .module('arrayFilter.service', [])
    .service('arrayFilter', arrayFilter);

    function arrayFilter(displayRssFeed) {
        this.filterNew = function(newArray, oldArray, dataLength) {
            var update = {
                urls: [],
                refresh: false
            }

            if (dataLength === 0)  {  // initial function run
                update.urls = newArray[0];
            } else {
                if (newArray[1].isEqual(oldArray[1])) { // settings didn't change
                    update.urls = newArray[0].filter(function(el) {
                        return oldArray[0].indexOf(el) === -1;
                    });
                } else {
                    update.urls = newArray[0];
                    update.refresh = true;
                }
            }

            return update;
        }
    }
})();
