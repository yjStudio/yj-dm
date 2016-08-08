(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log, $state, $timeout){

    var vm = this;

    $timeout(function(){
      var user = firebase.auth().currentUser;
      console.log(user);
      if (!user){
        $state.go("login");
      }
    }, 500)

    var database = firebase.database();

  }
})();
