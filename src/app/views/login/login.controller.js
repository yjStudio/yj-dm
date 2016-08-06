(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, STORE_user, toastr){

    var vm = this;
    vm.email = "yjstudio.2016@gmail.com";
    vm.password;

    vm.login = function(){
      firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
      .then(function(user){
        $log.debug("Login ok", user);
        toastr.success("登入成功");
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        $log.error("Login error", errorCode, errorMessage);
        toastr.error(errorMessage, "登入失败");
      });
    }
  }
})();
