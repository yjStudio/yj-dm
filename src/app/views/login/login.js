(function() {
  'use strict';

  angular.module('yjDm')
  .config(function ($stateProvider) {

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    });

  });
})();
