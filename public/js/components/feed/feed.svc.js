(function () {
  'use strict';
  console.log('loaded2');

  function feedService($http, $location) {
    var topicsArray = localStorage.getItem('topics').split(',');
    console.log('$location', $location);
    var baseURLString = $location.protocol() + '://' + $location.host() + ':' +
      $location.port() + '/feed?count=5';
    console.log('baseURLString', baseURLString);
    var self = {
      getFeeds: getFeeds
    };

    function getFeeds(callback) {
      topicsArray = localStorage.getItem('topics').split(',');
      var urlString = baseURLString;
      for (var ndx = 0; ndx < topicsArray.length; ndx++) {
        urlString = urlString + '&topic=' + topicsArray[ndx];
      }
      $http.get(urlString).then(function (response) {
        callback(response);
      });
    }

    return self;
  }
  angular.module('challenge').service('feedService', ['$http', '$location',
    feedService
  ]);
}());
