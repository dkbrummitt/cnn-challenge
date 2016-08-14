(function () {
  'use strict';
  console.log('loaded2');

  function feedService($http) {
    var topicsArray = localStorage.getItem('topics').split(',');
    var baseURLString = 'http://localhost:7000/feed?count=5';

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
  angular.module('challenge').service('feedService', ['$http', feedService]);
}());
