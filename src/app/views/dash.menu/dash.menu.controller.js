(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashMenuController', DashMenuController);

  /** @ngInject */
  function DashMenuController($log, Util, $scope, $state, $stateParams, STORE_categories, STORE_menuCategory){

    var vm = this;
    vm.categoriesMenuItems = getItemsByCategories();

    vm.categoriesMenu = STORE_menuCategory.menuCategory || [];

    STORE_categories.getCategories();
    STORE_menuCategory.getMenuCategory();

    function categories_change(){
      vm.categoriesMenuItems = getItemsByCategories();
      if (!$scope.$$phase) $scope.$apply();
    }

    function menuCategory_change(){
      vm.categoriesMenu = STORE_menuCategory.menuCategory || [];
      if (!$scope.$$phase) $scope.$apply();
    }

    function getItemsByCategories(){
      var tmp = angular.copy(STORE_categories.categories);
      if(!tmp) return [];
      return Object.keys(tmp).map(function(key) {
        var object = tmp[key]
        object.id= key;
        object.categories = [];
        return object;
      });
    }

    STORE_categories.on("change", categories_change);
    STORE_menuCategory.on("change", menuCategory_change)

    vm.itemExistInMenu = function(id){
      var exist = false;
      Util.traverse(vm.categoriesMenu, function(key, object){
          if(object.id == id){
              exist = true;
              return
          }
      });
      return exist;
    };

    vm.removeMenu = function(scope){
      scope.remove();
    };

    vm.saveMenu = function(){
      var data = angular.copy(vm.categoriesMenu)
      STORE_menuCategory.updateMenuCategory(data);
    }
  }
})();
