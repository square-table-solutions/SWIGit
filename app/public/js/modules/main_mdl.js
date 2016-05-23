'use strict';
// main client model and related controllers
angular.module('swigit.main_mdl', [])

  .controller('main_ctrl',['$scope',function($scope) {
      $scope.swigit = {
        title: 'SWIGit - Platform',
        info: 'square-table-solutions',
        date: new Date(),
        content: 'Welcome to the making of something great... Stay tuned for further development as we make SWIGit the blogging platform of your daydreams ;)'
      };
  }])

  .controller('nav_ctrl',['$scope',function($scope) {
      
  }]);