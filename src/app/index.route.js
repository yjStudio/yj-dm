(function() {
  'use strict';

  angular
    .module('yjDm')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      });

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/views/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
