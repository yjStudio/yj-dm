(function() {
  'use strict';

  angular.module('yjDm')
  .config(function ($stateProvider) {

    $stateProvider
    .state('dashboard.menu', {
      url: '/menu',
      templateUrl: 'app/views/dash.menu/dash.menu.html',
      controller: "DashMenuController",
      controllerAs: "vm"
    })

  });

})();
