'use strict';
// client routing

angular.module('swigit', [
  'ui.materialize',
  'ui.router',
  'swigit.auth_mdl',
  'swigit.data_mdl',
  'swigit.admn_mdl',
  'swigit.post_mdl',
  'swigit.main_mdl'
  ])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider,$urlRouterProvider,$locationProvider) {

          const main_state = {
            url: '/',
            templateUrl: '/templates/main_tmpl.html',
            controller: 'main_ctrl'
          };

          const post_edit_state = {
            url: '/edit',
            templateUrl: '/templates/post_edit_tmpl.html',
            resolve: {
              auth_user: ['$stateParams','auth_fac',function($stateParams,auth_fac) {
                // authenticate user credentials here
                // if editing current then fetch all post data
                return true; // temp
              }]
            },
            controller: 'post_edit_ctrl'
          };

          const post_feed_state = {
            url: '/:feed',
            templateUrl: '/templates/post_feed_tmpl.html',
            resolve: {
              feed_data: ['$stateParams','data_fac',function($stateParams,data_fac) {
                // resolve fetch before render
                // return data_fac.get_feed($stateParams);
                return true;
              }]
            },
            controller: 'post_feed_ctrl'
          };
          
          const post_body_state = {
            url: '/:feed/:url_slug', 
            templateUrl: '/templates/post_body_tmpl.html',
            resolve: {
              post_data: ['$stateParams','data_fac',function($stateParams,data_fac) {
                // resolve fetch before render
                // return data_fac.get_post($stateParams);
                return true;
              }]
            },
            controller: 'post_body_ctrl'
          }

      // if rout not found, redirect to root (consider a 404 page?)
      $urlRouterProvider.otherwise('/');
      $stateProvider // application route handler
        .state('main', main_state)
        .state('post_edit', post_edit_state)
        .state('post_feed', post_feed_state) // consider using sub-view for posts
        .state('post_body', post_body_state);
        
        $locationProvider.html5Mode(true);
        // defer listeners, more info in .run
        $urlRouterProvider.deferIntercept();
    }])

  .run([
    '$rootScope',
    '$state',
    '$stateParams',
    '$urlRouter',
    function($rootScope,$state,$stateParams,$urlRouter) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      // custom listeners now have access to $state & $stateParams
      
      $rootScope.$on('$locationChageStart', function(evt,next,curr) {
        // state change link pressed
        // middleware to run BEFORE loading new state
      });
      $rootScope.$on('$locationChageSuccess', function(evt,next,curr) {
        // router has resolved path
        // middleware to run AFTER loading new state
      });
      $rootScope.$on('$stateChangeError', function(evt,next,curr) {
        // router has resolved path
        // middleware to run AFTER loading new state
      });

      $rootScope.$on('$viewContentLoading', function(evt, cfi){ 
        // view is loading
      });
      $rootScope.$on('$viewContentLoaded', function(evt, cfi){ 
        // view has loaded
      });
      
      // initialize $urlRouter listener AFTER custom listeners
      $urlRouter.listen();
    }]);












