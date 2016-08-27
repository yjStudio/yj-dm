(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(STORE_articles, $scope){
    var vm = this;
    vm.newsArticles;

    STORE_articles.ref.limitToFirst(20).once("value", function (snapshot) {
      vm.newsArticles = snapshot.val();
      if (!$scope.$$phase) $scope.$apply();
    })
  }
})();
