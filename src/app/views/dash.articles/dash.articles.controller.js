(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashArticlesController', DashArticlesController);

  /** @ngInject */
  function DashArticlesController($log, $state, $mdDialog, STORE_articles){

    $log.debug("Init categories controller");

    var vm = this;

    vm.showDialogArticle = function(articleId){
      $mdDialog.show({
        controller: "DiaArticleController as vm",
        templateUrl: 'app/components/dia.article/dia.article.html',
        locals:{
          articleId: 'fsfdsafdasafsd'
        },
        clickOutsideToClose:true,
      })
    };
  }
})();
