(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DirArticleController', DirArticleController);

  /** @ngInject */
  function DirArticleController(){
    var vm = this;
    vm.article;
  }
})();
