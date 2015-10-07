(function() {
  'use strict';
  google.load("feeds", "1");

  angular
    .module('app', [
      'ui.router',
      'RSS.Feeds',
      'ngSanitize',
      'app.about',
      'firebase'
    ])
    .config(appConfig)
    .value("firebaseUrl", "https://rss-feed.firebaseio.com/")
    .service('fire', fireFn)
    .factory('feedManage', feedManageFn);

  // @ngInject
  function appConfig($stateProvider, $urlRouterProvider) {
    console.log('=== Start Config ===');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          "headerView": {
            templateUrl: "components/header/header.html"
          },
          "manageRssView": {
            templateUrl: "components/manageRssList/manage.html"
          },
          "rssFeedView": {
            templateUrl: "components/rssFeed/feed.html",
            controller: homeCtrlFn,
            controllerAs: 'hc'
          }
        }
      });
  }

  //@ngInject
  function homeCtrlFn(rssFactory, feedManage) {
    var vm = this;
    console.log('=== Home Controller ===');

    var feedList = [
      'http://feeds.feedburner.com/TEDTalks_video',
      'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/',
      'http://sfbay.craigslist.org/eng/index.rss',
      'http://www.slate.com/blogs/trending.fulltext.all.10.rss',
      'http://feeds.current.com/homepage/en_US.rss',
      'http://feeds.current.com/items/popular.rss',
      'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    ];

    vm.fire = feedManage.getFeeds('feed');
    feedManage.addFeed('feed');

    rssFactory.getRss(feedList[1]).then(function(result) {
      vm.rssFirst = result;
    });
  }

  //@ngInject
  function fireFn(firebaseUrl) {
    var ref = new Firebase(firebaseUrl);

    this.getRef = ref;
  }

  //@ngInject
  function feedManageFn(fire, $firebaseObject, $firebaseArray) {
    var obj = {};
    var ref = fire.getRef;

    obj.getFeeds = function(_name) {
      var fbObjs = $firebaseArray(ref.child(_name));

      return fbObjs;
    }

    obj.addFeed = function(_name, _obj) {
      var list = $firebaseArray(ref.child(_name));

      list.$add(_obj);
    }

    obj.removeFeed = function(_name, _id) {
      return $firebaseObject(ref.child(_name).child(_id)).$remove();
    }

    obj.saveFeed = function(_name, _id, _params) {
      var fbObj = $firebaseObject(ref.child(_name).child(_id));

      fbObj.name = _params.name;
      fbObj.url = _params.url;
      fbObj.$save();
    }

    return obj;
  }
})();
