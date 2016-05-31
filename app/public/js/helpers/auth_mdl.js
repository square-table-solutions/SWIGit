'use strict';
// client auth helpers
angular.module('swigit.auth_mdl', [])

  .factory('auth_fac',['$http','$state','$window',function($http,$state,$window) {

    const GET = (api,params) => $http({method:'GET', url:`/_api/auth/${api}`, data:params});
    const POST = (api,params) => $http({method:'POST', url:`/_api/auth/${api}`, data:params});

    const signon = function(params) {
      return POST('signon',params)
        .then(function(res) {
          console.log(res);
          let session = JSON.stringify({
            username: params.username,
            token: res.data
          });
          $window.localStorage.setItem('swigit.bling', session);
          $state.go('admn.edit');
          return false;
        })
        .catch(function(err) {
          console.error(err);
          return err;
        });
    };

    const signup = function(params) {
      return POST('signup',params)
        .then(function(res) {
          console.log(res);
          let session = JSON.stringify({
            username: params.username,
            token: res.data
          });
          $window.localStorage.setItem('swigit.bling', session);
          $state.go('admn.edit');
          return false;
        })
        .catch(function(err) {
          console.error(err);
          return err;
        });
    };

    

    return {
      signon: signon,
      signup: signup
    };

  }]);