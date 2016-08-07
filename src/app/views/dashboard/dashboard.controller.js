(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log, $state, STORE_user){

    var vm = this;
    //var user = firebase.auth().currentUser;
    // if (!user){
    //   //$state.go("login");
    // }d
    var database = firebase.database();
    
  }
})();
