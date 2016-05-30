'use strict';
// main client model and related controllers
angular.module('swigit.main_mdl', [])

  .controller('auth_nav_ctrl',['$scope',function($scope) {
     
  }])

  .controller('main_ctrl',['$scope',function($scope) {
      
  }])

  .controller('sign_on_ctrl',['$scope',function($scope) {
      
  }])

  .controller('sign_up_ctrl',['$scope','auth_fac',function($scope,auth_fac) {
      $scope.params = {};
      $scope.signup = function(params) {
        console.log(params);
        auth_fac.signup(params);
      }
  }]);

  