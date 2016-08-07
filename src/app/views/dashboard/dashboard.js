(function() {
  'use strict';

  angular.module('yjDm')
  .config(function ($stateProvider) {

    $stateProvider
    .state('dashboard', {
        // abstract: true,
        url: '/dashboard',
        templateUrl: 'app/views/dashboard/dashboard.html',
        controller: "DashboardController",
        controllerAs: "vm"
    })

  });

})();
