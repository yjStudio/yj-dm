(function() {
  'use strict';

  angular.module('yjDm')
  .config(function ($stateProvider) {

    $stateProvider
    .state('dashboard.articles', {
      // abstract: true,
      url: '/articles',
      templateUrl: 'app/views/dash.articles/dash.articles.html',
      controller: "DashArticlesController",
      controllerAs: "vm"
    })

  });

})();
