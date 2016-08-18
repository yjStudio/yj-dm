(function() {
  'use strict';

  angular.module('yjDm')
  .config(function ($stateProvider) {

    $stateProvider
    .state('dashboard.articles', {
      url: '/articles?page',
      templateUrl: 'app/views/dash.articles/dash.articles.html',
      controller: "DashArticlesController",
      controllerAs: "vm"
    })

  });

})();
