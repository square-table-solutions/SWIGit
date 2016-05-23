'use strict';
// client data helpers
angular.module('swigit.data_mdl', [])

  .factory('data_fac',['$http','auth_fac',function($http,auth_fac) {

// 'db' structure example:
// --->
    // const db = {
    //   exampleFeedname: {
    //     fullname: 'Example Feed Name',
    //     data: { feed: postArray, hash: postIndexByUrlSlug }
    //   },
    //   anotherName: {
    //     fullname: 'Another Name',
    //     data: { feed: postArray, hash: postIndexByUrlSlug }
    //   }
    // };
    const db = {}; 

    // http requests with params object, returns promise
    const GET = (params) => $http({method:'GET', url:'/_api/posts', data:params});
    const POST = (params) => $http({method:'POST', url:'/_api/posts', data:params});

    /**
     * [ 'Feed' constructor, accepts data from server and indexes
     *   the array of posts by url_slug property for quick lookup ]
     * @param {[Object]} data [ server response w/ properties:
     *                          fullname(String), feed(Array) ]
     */
    const Feed = function(data) {
      let hash = data.feed.reduce((curr, val) => {
        curr[val.url_slug] = val;
        return curr;
      },{});
      this.fullname = data.fullname;
      this.data = {feed:data.feed, hash:hash};
    };
    
    /**
     * [get_feed: checks local db object for feed data using params,
     * if none exists, make http call to the server; params as data  ]
     * @param  {[Object]} params    [ query for local 'db' or server ]
     * @return {[Feed || Promise]}  [ if 'params.feed' in 'db', 
     *                                    return Object
     *                                  else,
     *                                    query server,
     *                                    construct Feed for 'db',
     *                                    return promise              ]
     */
    const get_feed = function(params) {
      if(db[params.feed])
        return db[params.feed];
      return GET(params) 
        .then((resp) => (db[params.feed] = new Feed(resp.fullname,resp.feed)));
        //TODO implement error handler
    };

    /**
     * [get_post: checks local db object for post data using params,
     * if none exists, make http call to the server; params obj as data]
     * @param  {[Object]} params    [ query for local 'db' or server ]
     * @return {[Feed || Promise]}  [ if 'params' in 'db', 
     *                                    return Object
     *                                  else,
     *                                    query server,
     *                                    construct Feed for 'db',
     *                                    return promise             ]
     */
    const get_post = function(params) {
      if(db[params.feed].hash[params.url_slug])
        return db[params.feed].hash[params.url_slug];
      return GET(params)
        .then((resp) => (db[params.feed] = new Feed(resp.data)));
        //TODO implement error handler
    };

    return {
      get_feed: get_feed,
      get_post: get_post
    };

  }]);






