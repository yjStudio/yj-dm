(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashArticlesController', DashArticlesController);

  /** @ngInject */
  function DashArticlesController($log, $scope, $state, $mdDialog, Util, Upload, STORE_articles){

    $log.debug("Init categories controller");

    var vm = this;
    vm.selected = [];
    vm.articles = STORE_articles.articles;

    vm.promise = STORE_articles.getArticles();

    STORE_articles.event.on("change", function(){
      vm.articles = STORE_articles.articles
    });

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

    // for multiple files:
    vm.uploadFiles = function (files) {
      var file;
      $log.debug("upload images", files);
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          file = files[i];
          vm.updateFile(file);
        }
      }
    }

    vm.updateFile = function(file){
      Upload.imageDimensions(file)
      .then(function(dimension){
        Upload.resize(file, dimension.width, dimension.height, 0.8)
        .then(function(resizedFile){
        });
      })
    }

  }
})();
