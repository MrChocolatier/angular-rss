(function() {
  'use strict';

  angular
    .module('dataShare.service', [])
    .service('dataShare', dataShareFn);

    //@ngInject
    function dataShareFn() {
      var share = this;

      share.feed = {
          url: '',
          name: ''
      };
    }
})();
