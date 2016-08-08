(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashCategoriesController', DashCategoriesController);

  /** @ngInject */
  function DashCategoriesController($log, $state, $mdDialog, STORE_categories){

    $log.debug("Init categories controller");

    var vm = this;
    vm.categories;

    STORE_categories.getCategories()
    .then(function(data){
      vm.categories = STORE_categories.categories;
    })

    vm.showDialogCategory = function(category){
      $mdDialog.show({
        controller: "DiaCategoryController as vm",
        templateUrl: 'app/components/dia.category/dia.category.html',
        locals:{
          category: category
        },
        clickOutsideToClose:true,
      })
    }
  }
})();
