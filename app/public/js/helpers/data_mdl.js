'use strict';
// client data helpers
angular.module('swigit.data_mdl', [])

  .factory('data_fac',['$http','auth_fac',function($http,auth_fac) {
    // http request with params object, returns promise
    const GET = (params) => $http({method:'GET', url:'/_api/posts', data:params});
    // User object constructor
    const User = function(full_name,feed,hash) {
      this.full_name = full_name;
      this.post = {feed:feed, hash:hash};
    };

    // stores hash of users
    var db = {}; 
     
    const get_feed = function(params) {
      console.log(params);
      //TODO: if not in db, make http request
      return params;
    };

    const get_post = function(params) {
      console.log(params);
      //TODO: if not in db, make http request
      return params;
    };

    return {
      db: db,
      get_feed: get_feed,
      get_post: get_post
    };

  }]);






