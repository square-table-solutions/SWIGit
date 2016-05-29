'use strict';
// main client model and related controllers
angular.module('swigit.main_mdl', [])

  .controller('main_ctrl',['$scope',function($scope) {
      $('nav').hide();
  }])

  .controller('nav_ctrl',['$scope',function($scope) {
      
  }]);