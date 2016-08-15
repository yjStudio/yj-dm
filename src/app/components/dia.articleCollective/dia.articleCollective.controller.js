(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DiaArticleCollectiveController', DiaArticleCollectiveController);

  /** @ngInject */
  function DiaArticleCollectiveController($log, $scope, $mdDialog, Upload, Util, STORE_articles) {

    var vm = this;
    vm.newArticles = [];
    vm.selected=[];
    vm.name;

    // for multiple files:
    vm.uploadFiles = function (files) {
      $log.debug("upload images", files);
      if (files && files.length) {
        files.forEach(function(file){
          Upload.imageDimensions(file)
          .then(function(dimension){
            //resize file
            Upload.resize(file, dimension.width, dimension.height, 0.8)
            .then(function(resizedFile){
              var newArticle = {file: resizedFile};
              vm.newArticles.push(newArticle);
            });
          })
        });
      }
    }

    vm.createArticles = function(){
      vm.newArticles.forEach(function(article){
        STORE_articles.createArticleWithImage(article.file, article);
      });
      vm.cancel();
    }

    vm.updateFile = function(file){
      vm.selectedImage = true;
      Upload.imageDimensions(file)
      .then(function(dimension){
        //resize file
        Upload.resize(file, dimension.width, dimension.height, 0.8)
        .then(function(resizedFile){
          $log.debug("resizedFile", resizedFile.$ngfName)
        });
      })
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();
