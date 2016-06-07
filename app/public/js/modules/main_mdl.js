'use strict';
// main client model and related controllers
angular.module('swigit.main_mdl', [])

  .controller('auth_nav_ctrl',['$scope',function($scope) {
     
  }])

  .controller('main_ctrl',['$scope',function($scope) {
    // root level scope controller
  }])

  .controller('main_form_ctrl',[
    '$scope',
    '$state',
    'auth_fac',
    function($scope,$state,auth_fac) {

      $scope.params = {};

      $scope.signon = function(params) {
        console.log(params);

        if(!$state.is('main.sign_on'))
          return $state.go('main.sign_on')
        if(!params)
          return null; // should set form to invalid

        let username = params.username;
        let password = params.password;

        // move to validate function
        if(username.length > 3 && password.length > 6)
          return auth_fac.signon(params);
        else
          return null; // should set form to invalid
      };
      $scope.signup = function(params) {
        console.log(params);

        if(!$state.is('main.sign_up'))
          return $state.go('main.sign_up')
        if(!params)
          return null; // should set form to invalid

        let username = params.username;
        let fullname = params.fullname;
        let email = params.email;
        let password = params.password;

        // move to validate function
        if(username.length > 3 && password.length > 6)
          return auth_fac.signup(params);
        else
          return null; // should set form to invalid
      };

    }]);



  