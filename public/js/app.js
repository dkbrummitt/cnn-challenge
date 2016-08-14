(function () {
  'use strict';
  var depends = ['ui.router', 'ui.bootstrap'];

  function configureRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "js/components/feed/feed.html"
      });
    if (!localStorage.getItem('topics')) {
      localStorage.setItem('topics', 'cnnbrk');
    }
  }

  angular.module('challenge', depends)
    .config(['$stateProvider', '$urlRouterProvider',
      configureRoutes
    ])
    .value('topics', 'cnnbrk');
}());
