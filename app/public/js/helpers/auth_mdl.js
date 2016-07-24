'use strict';
// client auth helpers
angular.module('swigit.auth_mdl', [])

  .factory('auth_fac',['$http','$state','auth_sess',function($http,$state,auth_sess) {

    // const GET = (api,params) => $http({method:'GET', url:`/_api/auth/${api}`, data:params});
    const POST = (api,params) => $http({method:'POST', url:`/_api/auth/${api}`, data:params});

    const signon = function(params) {
      return POST('signon',params)
        .then(function(res) {
            auth_sess.set({
              username: params.username,
              token: res.data
            })
            return $state.go('admn.edit');
          })
        .catch(function(err) {
          console.error(err);
          return err;
        });
    };

    const signup = function(params) {
      return POST('signup',params)
        .then(function(res) {
            auth_sess.set({
              username: params.username,
              token: res.data
            })
            return $state.go('admn.edit');
          })
        .catch(function(err) {
          console.error(err);
          return err;
        });
    };

    const log_out = function() {
      auth_sess.end();
      return $state.go('main.sign_on');
    }

    const sess = {
      username: function() {
        return auth_sess.get().username;
      },
      token: function () {
        return auth_sess.get().token;
      }
    }
    
    return {
      signon: signon,
      signup: signup,
      logout: log_out,
      sess: sess
    };

  }])

  .factory('auth_sess',['$http','$state','$window',function($http,$state,$window) {

    // const session = {};

    const set_session = function(params) {
      return $window.localStorage.setItem('swigit.bling', JSON.stringify(params));
    };

    const get_session = function() {
        let session = $window.localStorage.getItem('swigit.bling');
        // angular.extend(session, JSON.parse(s));
      console.log(session);
      return JSON.parse(session);
    };

    const end_session = function() {
      return $window.localStorage.removeItem('swigit.bling');
    };

    
    return {
      set: set_session,
      get: get_session,
      end: end_session
    };

  }]);