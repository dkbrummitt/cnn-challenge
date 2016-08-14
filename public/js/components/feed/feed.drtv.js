(function () {
  'use strict';

  function cnnFeed() {
    var conf = {};
    conf.restrict = 'A';
    conf.templateUrl = 'js/components/feed/feed.tmpl.html';

    return conf;
  }
  angular.module('challenge').directive('cnnFeed', cnnFeed);
}());
