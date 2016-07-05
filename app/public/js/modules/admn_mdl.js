'use strict';
// client admin model and related controllers
angular.module('swigit.admn_mdl', [])

  .controller('admn_header_nav_ctrl',[
    '$scope',
    'auth_fac',
    function($scope,auth_fac) {
      $scope.logout = auth_fac.logout;
      $scope.username = auth_fac.sess.username();
    }])

  .controller('admn_ctrl',[
    '$scope',
    function($scope) {
      // ...
    }])

  .controller('admn_edit_ctrl',[
    '$scope',
    '$state',
    '$stateParams',
    'data_fac',
    'auth_fac',
    function($scope,$state,$stateParams,data_fac,auth_fac) {

      $scope.post = {};

      // data_fac.get_post({
      //     feed: auth_fac.sess.username(),
      //     url_slug: $stateParams.url_slug
      //   }).then(function(resp) {
      //     $scope.post = resp;
      //   },function(err) {
      //     $state.go('edit({url_slug: "new"})');
      //   });

      if(!$stateParams || $stateParams.url_slug !== 'new') {
        $state.go('admn.edit',{url_slug:'new'})
      }

      $scope.submit = function(params) {
        console.log(params);
        data_fac.upd_post(params).
          then(function(res) {
            console.log(res);
          });
      };

      $scope.to_slug = function(val) {
        return $scope.post.url_slug = val.toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-');
      };

    }])

  .controller('admn_feed_ctrl',[
    '$scope',
    'data_fac',
    'auth_fac',
    function($scope,data_fac,auth_fac) {

      $scope.posts = [
        {
        title: 'Fake feed array...',
        fullname: 'L. M. Welinder',
        username: 'lukas',
        feed: null,
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      },
      {
        title: 'Fake feed array...',
        fullname: 'L. M. Welinder',
        username: 'lukas',
        feed: null,
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      },
      {
        title: 'Fake feed array...',
        fullname: 'L. M. Welinder',
        username: 'lukas',
        feed: null,
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      }
      ]
    }])

  .controller('admn_post_ctrl',[
    '$scope',
    'data_fac',
    'auth_fac',
    function($scope,data_fac,auth_fac) {

      $scope.post =
        {
        title: 'Fake feed array...',
        fullname: 'L. M. Welinder',
        username: 'lukas',
        feed: null,
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      };
    }])

  .controller('admn_work_ctrl',[
    '$scope',
    function($scope) {

    }])

  .controller('admn_prof_ctrl',[
    '$scope',
    function($scope) {

    }]);








