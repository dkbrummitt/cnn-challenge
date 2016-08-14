(function () {
  'use strict';

  console.log('Loaded!');

  function FeedController(feedService, $scope) {
    var vm = this;
    var topicsArray = localStorage.getItem('topics').split(',');

    function handleSvs(response) {
      console.log(response);
      $scope.limits = response.data.feed.limits;
      $scope.feeds = response.data.feed;
    }
    feedService.getFeeds(handleSvs);
    return vm;
  }
  angular.module('challenge').controller('FeedController', ['feedService',
    '$scope',
    FeedController
  ]);
}());
