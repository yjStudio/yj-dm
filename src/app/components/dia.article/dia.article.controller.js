(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DiaArticleController', DiaArticleController);

  /** @ngInject */
  function DiaArticleController($log, $scope, $mdDialog, Util, Upload, articleId, STORE_articles) {

    var vm = this;
    vm.name;
    vm.image = null;
    vm.isNew = (articleId === 'new')
    vm.article = vm.isNew ? {} : STORE_articles.articles[articleId];

    vm.uploadFile = function (file) {
      if (file) {
        Upload.imageDimensions(file)
        .then(function(dimension){
          //resize file
          Upload.resize(file, dimension.width, dimension.height, 0.8)
          .then(function(resizedFile){
            $log.debug("upload resized file", file);

            if(resizedFile.size > 5242880){
              vm.image = null;
              $log.warn("upload image size > 0.5mb");
            }
            else{
              vm.image = resizedFile;
            }
          });
        })
      }
    }

    vm.createOrUpdate = function(isCreate){
      if(isCreate){
        if(vm.image){
          STORE_articles.createArticleWithImage(vm.image, vm.article);
          $mdDialog.cancel();
        }else{
          STORE_articles.createArticle(vm.article);
          $mdDialog.cancel();
        }
      }else{
        vm.update();
      }
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();
