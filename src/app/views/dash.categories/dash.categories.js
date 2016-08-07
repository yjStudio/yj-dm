(function() {
  'use strict';

  angular.module('yjDm')
  .config(function ($stateProvider) {

    $stateProvider
    .state('dashboard.categories', {
      // abstract: true,
      url: '/categories',
      templateUrl: 'app/views/dash.categories/dash.categories.html',
      controller: "DashCategoriesController",
      controllerAs: "vm"
    })

  });

})();
