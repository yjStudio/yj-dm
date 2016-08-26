(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashCategoriesController', DashCategoriesController);

  /** @ngInject */
  function DashCategoriesController($log, $scope, $state, $mdDialog, STORE_categories){

    $log.debug("Init categories controller");

    var vm = this;
    vm.categories = STORE_categories.categories;

    STORE_categories.getCategories();

    function categories_change(){
      vm.categories = STORE_categories.categories;
      if (!$scope.$$phase) $scope.$apply();
    }

    STORE_categories.on("change", categories_change);

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

    $scope.$on("$destroy", function(){
      STORE_categories.off("change", categories_change);
    })
  }
})();
