(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DiaCategoryController', DiaCategoryController);

  /** @ngInject */
  function DiaCategoryController($scope, $mdDialog, categoryId, STORE_categories) {

    var vm = this;
    vm.name;
    vm.isNew = (categoryId === 'new')

    if(!vm.isNew){
      vm.name = STORE_categories.categories[categoryId].name;
    }

    vm.createOrUpdate = function(name) {

      if(vm.isNew){
        vm.create(name);
      }else{
        vm.update(name);
      }

      $mdDialog.hide();
    };

    vm.create = function(name){
      STORE_categories.createCategory(name);
    }

    vm.update = function(name){
      var category = STORE_categories.categories[categoryId];
      category.name = name;
      STORE_categories.updateCategory(categoryId, category);
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();
