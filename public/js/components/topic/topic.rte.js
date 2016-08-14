(function () {
  'use strict';

  function configureTopicRoute($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('state1', {
        url: "/topics",
        templateUrl: "js/components/topic/topic.html"
      })
  }
  angular.module('challenge').config(['$stateProvider', '$urlRouterProvider',
    configureTopicRoute
  ]);
}());
