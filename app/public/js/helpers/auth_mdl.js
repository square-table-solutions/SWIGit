'use strict';
// client auth helpers
angular.module('swigit.auth_mdl', [])

  .factory('auth_fac',['$http','$state','$window',function($http,$state,$window) {

    const GET = (params) => $http({method:'GET', url:'/_api/auth', data:params});
    const POST = (params) => $http({method:'POST', url:'/_api/auth', data:params});

    const signin = function(params) {
      return GET(params)
        .then(function(res) {
          $window.localStorage.setItem('swigit.bling', res);
          $state.go('edit');
        })
        .catch(function(err) {
          console.error(err);
          return err;
        });
    };

    const signup = function(params) {
      return POST(params)
        .then(function(res) {
          $window.localStorage.setItem('swigit.bling', res);
          $state.go('admn.edit');
        })
        .catch(function(err) {
          console.error(err);
          return err;
        });
    };

    

    return {
      signin: signin,
      signup: signup
    };

  }]);