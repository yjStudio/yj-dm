(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashArticlesController', DashArticlesController);

  /** @ngInject */
  function DashArticlesController($log, $scope, $state, $stateParams, $mdDialog, Util, Upload, STORE_articles, STORE_categories){

    $log.debug("Init categories controller");

    var vm = this;

    vm.page = $stateParams.page | 1;
    vm.selected = [];
    vm.categories
    vm.articles = Object.keys(STORE_articles.articles).map(function(key) {
      var object = STORE_articles.articles[key];
      object.id = key;
      return object;
    });

    vm.pagination = {
      limit: 10,
      page: 1,
      total: 100
    }

    vm.promise = STORE_articles.getArticles();

    STORE_articles.on("change", function article_change(){
      vm.articles = Object.keys(STORE_articles.articles).map(function(key) {
        var object = STORE_articles.articles[key];
        object.id = key;
        return object;
      });
      vm.pagination.total = vm.articles.length
    });


    STORE_categories.on("change", function categories_change(){
      vm.categories = STORE_categories.categories;
    });

    vm.changeCategory = function(article){
      STORE_articles.updateArticle(article.id, article);
    }

    vm.showDialogArticle = function(articleId){
      $mdDialog.show({
        controller: "DiaArticleController as vm",
        templateUrl: 'app/components/dia.article/dia.article.html',
        locals:{
          articleId: articleId
        },
        clickOutsideToClose:true
      })
    };

    vm.showDialogArticleCollective = function(){
      $mdDialog.show({
        controller: "DiaArticleCollectiveController as vm",
        templateUrl: 'app/components/dia.articleCollective/dia.articleCollective.html',
        clickOutsideToClose:true
      })
    };
  }
})();
