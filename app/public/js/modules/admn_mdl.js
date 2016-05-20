'use strict';
// client admin model and related controllers
angular.module('swigit.admn_mdl', [])

  .controller('admn_ctrl',['$scope',function($scope) {
      $scope.hello = 'Welcome to SWIGit';
  }]);