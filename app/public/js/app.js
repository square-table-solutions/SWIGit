'use strict';
// client routing

angular.module('swigit', [
  'ui.materialize',
  'ui.router',
  'ngAnimate',
  'swigit.auth_mdl',
  'swigit.data_mdl',
  'swigit.admn_mdl',
  'swigit.post_mdl',
  'swigit.main_mdl'
  ])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    '$locationProvider',
    function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider) {

          const main = {
            name: 'main',
            url: '/',
            views: {
              'footer_nav_view@': {
                templateUrl: '/templates/auth/auth_nav_tmpl.html',
                controller: 'auth_nav_ctrl'
              },
              '@': {
                templateUrl: '/templates/main_tmpl.html',
                controller: 'main_ctrl'
              }
            }
          };

          const sign_on = {
            name: 'main.sign_on',
            parent: main,
            templateUrl: '/templates/auth/sign_on_tmpl.html',
            controller: 'sign_on_ctrl'
          };

          const sign_up = {
            name: 'main.sign_up',
            parent: main,
            templateUrl: '/templates/auth/sign_up_tmpl.html',
            controller: 'sign_up_ctrl'
          };

          const admn = {
            name: 'admn',
            views: {
              'header_nav_view@': {
                templateUrl: '/templates/post/swig_nav_tmpl.html',
                controller: 'swig_nav_ctrl'
              },
              '@': {
                templateUrl: '/templates/swig_tmpl.html',
                controller: 'admn_ctrl'
              }
            }
          };

          const admn_edit_state = {
            name: 'admn.edit',
            parent: admn,
            url: '/edit',
            templateUrl: '/templates/admn/admn_edit_tmpl.html',
            resolve: {
              auth_user: ['$stateParams','auth_fac',function($stateParams,auth_fac) {
                // authenticate user credentials here
                // if editing current then fetch all post data
                return true; // temp
              }]
            },
            controller: 'admn_edit_ctrl'
          };

          const swig = {
            name: 'swig',
            views: {
              'header_nav_view@': {
                templateUrl: '/templates/post/swig_nav_tmpl.html',
                controller: 'swig_nav_ctrl'
              },
              '@': {
                templateUrl: '/templates/swig_tmpl.html',
                controller: 'swig_ctrl'
              }
            }
          };

          const swig_feed_state = {
            name: 'swig.feed',
            parent: swig,
            url: '/:feed',
            templateUrl: '/templates/post/post_feed_tmpl.html',
            resolve: {
              feed_data: ['$stateParams','data_fac',function($stateParams,data_fac) {
                // resolve fetch before render
                // return data_fac.get_feed($stateParams);
                return true;
              }]
            },
            controller: 'post_feed_ctrl'
          };

          const swig_body_state = {
            name: 'swig.body',
            parent: swig,
            url: '/:feed/:url_slug',
            templateUrl: '/templates/post/post_body_tmpl.html',
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
        .state(main)
        .state(sign_on)
        .state(sign_up)

        .state(admn)
        .state(admn_edit_state)

        .state(swig)
        .state(swig_feed_state) // post collection
        .state(swig_body_state); // individual post
        // .state('swig.prof', swig_prof_state);// author profile

      // set to use push-state, defaults to !# on older browsers
      $locationProvider.html5Mode(true);

      // defer listeners, more info in .run
      // $urlRouterProvider.deferIntercept();

      // attach authentication token to http requests
      $httpProvider.interceptors.push('attach_tokens');
    }])

  .factory('attach_tokens', ['$window',function($window) {
      return {
        request: function(req) {
        let jwt = $window.localStorage.getItem('swigit.bling');
        req.headers['x-access-token'] = jwt;
        req.headers['Allow-Control-Allow-Origin'] = '*';
        return req;
      }};
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

      $rootScope.$on('$locationChangeStart', function(evt,next,curr) {
        // state change link pressed
        // middleware to run BEFORE loading new state
      });
      $rootScope.$on('$locationChangeSuccess', function(evt,next,curr) {
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
      // $urlRouter.listen();
    }]);

  
