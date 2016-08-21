(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashCategoriesController', DashCategoriesController);

  /** @ngInject */
  function DashCategoriesController($log, $state, $mdDialog, STORE_categories, STORE_menuCategory){

    $log.debug("Init categories controller");

    var vm = this;
    vm.categories;
    vm.categoriesMenuItems;

    vm.categoriesMenu = [];

    STORE_categories.getCategories()
    .then(function(){
      // vm.categories = STORE_categories.categories;
    })

    STORE_categories.event.on("change", function(){
      vm.categories = STORE_categories.categories;

      var tmp = angular.copy(vm.categories);
      vm.categoriesMenuItems = Object.keys(tmp).map(function(key) {
        var object = tmp[key]
        object.categories = [];
        return object;
      });
    })

    STORE_menuCategory.getMenuCategory();

    STORE_menuCategory.event.on("change", function(){
      vm.categoriesMenu = STORE_menuCategory.menuCategory;
      console.log(STORE_menuCategory.menuCategory);
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
            .title('确定你要删除 "'+name+'" 这个分类吗')
            .textContent("一旦删除将无法找回")
            .ok('删除')
            .cancel('关闭');
      $mdDialog.show(confirm).then(function() {
        STORE_categories.removeCategory(key);
      });
    }

    vm.saveMenu = function(){
      var data = angular.copy(vm.categoriesMenu)
      STORE_menuCategory.updateMenuCategory(data);
    }
  }
})();
