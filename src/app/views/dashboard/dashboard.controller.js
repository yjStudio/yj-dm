(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log, $state, $timeout){

    $timeout(function(){
      var user = firebase.auth().currentUser;
      if (!user){
        $state.go("login");
      }
    }, 500)

  }
})();
