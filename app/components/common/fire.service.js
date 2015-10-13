(function() {
  'use strict';

  angular
    .module('firebaseRef.service', [])
    .constant("firebaseUrl", "https://rss-feed.firebaseio.com/")
    .service('DBC', dbcFactoryFn);

  //@ngInject
  function dbcFactoryFn(firebaseUrl) {
    var ref = new Firebase(firebaseUrl);
    this.getRef = ref;
  }
})();
