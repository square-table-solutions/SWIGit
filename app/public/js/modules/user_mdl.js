'use strict';
// user model and related controllers
angular.module('swigit.user_mdl', [])

  .controller('user_feed_ctrl',['$scope',function($scope) {
    $scope.posts = [
      {
        title: 'Fake feed array...',
        author: 'L. M. Welinder',
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      },
      {
        title: 'Fake feed array...',
        author: 'L. M. Welinder',
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      },
      {
        title: 'Fake feed array...',
        author: 'L. M. Welinder',
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      }
    ];

  }])

  .controller('user_post_ctrl',['$scope',function($scope) {
    $scope.post = {
        title: 'Fake post...',
        author: 'L. M. Welinder',
        url_slug: 'random_postname',
        published: 'May 19, 2016',
        content: 'This is an exerpt'
      };
  }]);