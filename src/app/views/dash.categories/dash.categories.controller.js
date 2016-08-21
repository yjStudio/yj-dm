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
    vm.categoriesMenuItems;

    vm.tree2 = [{
      'id': 1,
      'name': 'tree2 - item1',
      'nodes': []
    }, {
      'id': 2,
      'name': 'tree2 - item2',
      'nodes': []
    }, {
      'id': 3,
      'name': 'tree2 - item3',
      'nodes': []
    }, {
      'id': 4,
      'name': 'tree2 - item4',
      'nodes': []
    }];

    vm.categoriesMenu = [];

    STORE_categories.getCategories()
    .then(function(){
      vm.categories = STORE_categories.categories;
      var tmp = angular.copy(vm.categories);
      vm.categoriesMenuItems = Object.keys(tmp).map(function(key) {
        var object = tmp[key]
        object.categories = [];
        return object;
      });
    })

    STORE_categories.event.on("change", function(){
      vm.categories = STORE_categories.categories;
    })

    vm.showDialogCategory = function(categoryId){
      $mdDialog.show({
        controller: "DiaCategoryController as vm",
        templateUrl: 'app/components/dia.category/dia.category.html',
        locals:{
          categoryId: categoryId
        },
        clickOutsideToClose:true
      })
    };

    vm.remove = function(key, name){
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
            .name('确定你要删除 "'+name+'" 这个分类吗')
            .textContent("一旦删除将无法找回")
            .ok('删除')
            .cancel('关闭');
      $mdDialog.show(confirm).then(function() {
        STORE_categories.removeCategory(key);
      });
    }
  }
})();
