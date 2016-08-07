(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashCategoriesController', DashCategoriesController);

  /** @ngInject */
  function DashCategoriesController($log, $state, STORE_categories){

    $log.debug("Init categories controller");

    var vm = this;

    // STORE_categories.getCategories()
    // .then(function(data){
    //   console.log(data);
    // });
  }
})();
