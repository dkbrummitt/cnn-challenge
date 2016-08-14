(function () {
  'use strict';

  function TopicController(topics, $scope) {
    var vm = this,
      ndx = 0;
    var topicsArray = localStorage.getItem('topics').split(',');
    $scope.alerts = [];
    $scope.newTopic = "";
    for (ndx = 0; ndx < topicsArray.length; ndx++) {
      $scope.alerts.push({
        type: 'success',
        msg: topicsArray[ndx]
      });
    }

    vm.addAlert = function () {
      console.log('$scope.newTopic=', $scope.newTopic);
      if ($scope.newTopic) {
        $scope.alerts.push({
          type: 'success',
          msg: $scope.newTopic
        });
        topicsArray.push($scope.newTopic);
        localStorage.setItem('topics', topicsArray.toString());
        $scope.newTopic = '';
        angular.module('challenge').value('topics', topicsArray.toString);
      }
    };

    vm.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
      topicsArray.splice(index, 1);
      angular.module('challenge').value('topics', $scope.alerts.toString);

      localStorage.setItem('topics', topicsArray.toString());
    };

  }
  angular.module('challenge').controller('TopicController', ['topics',
    '$scope',
    TopicController
  ]);
}());
