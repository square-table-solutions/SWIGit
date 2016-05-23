'use strict';
// user model and related controllers
angular.module('swigit.post_mdl', [])

  .controller('post_feed_ctrl',['$scope',function($scope) {
    $scope.posts = [
      {
        title: 'Fake feed array...',
        fullname: 'L. M. Welinder',
        username: 'lukas',
        feed: null,
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      }
    ];

  }])

  .controller('post_body_ctrl',['$scope',function($scope) {
    $scope.post = {
        title: 'Fake post body...',
        fullname: 'L. M. Welinder',
        username: 'lukas',
        feed: null,
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      };
  }])

  .controller('post_form_ctrl',['$scope',function($scope) {
    //$scope.post;
  }]);