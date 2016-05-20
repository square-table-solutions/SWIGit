'use strict';
// client routing

angular.module('swigit', [
  'ui.materialize',
  'ui.router',
  'swigit.data_mdl',
  'swigit.auth_mdl',
  'swigit.admn_mdl',
  'swigit.user_mdl',
  'swigit.main_mdl'
  ])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider,$urlRouterProvider,$locationProvider) {
      // if rout not found routes to root
      $urlRouterProvider.otherwise('/');
      $stateProvider // application route handler
        .state('main', {
            url: '/',
            templateUrl: '/templates/main_tmpl.html',
            controller: 'main_ctrl'
          })
        .state('user_feed', {
            url: '/:username',
            templateUrl: '/templates/post_feed_tmpl.html',
            resolve: {
              feed_data: ['$stateParams','data_fac',function($stateParams,data_fac) {
                // resolve fetch before render to avoid dom flicker
                return data_fac.get_feed($stateParams);
              }]
            },
            controller: 'user_feed_ctrl'
          })
        .state('user_post', {
            url: '/:username/:url_slug',
            templateUrl: '/templates/post_body_tmpl.html',
            resolve: {
              post_data: ['$stateParams','data_fac',function($stateParams,data_fac) {
                // resolve fetch before render to avoid dom flicker
                return data_fac.get_post($stateParams);
              }]
            },
            controller: 'user_post_ctrl'
          });
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
        // middleware to run BEFORE loading new state
        $('.main-view').hide();
      });
      $rootScope.$on('$locationChageSuccess', function(evt,next,curr) {
        // middleware to run AFTER loading new state
        $('.main-view').fadeIn(600);
      });
      // initialize $urlRouter listener AFTER custom listeners
      $urlRouter.listen();
    }]);












