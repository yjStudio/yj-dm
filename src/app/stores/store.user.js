/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_user', STORE_user)

  function STORE_user(){

    var store =
    {
        authenticated: false
    }

    return store;
  }
})();
