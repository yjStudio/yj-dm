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
      //create new article
      if(isCreate){
        if(vm.image){
          STORE_articles.createArticleWithImage(vm.image, vm.article);
        }else{
          STORE_articles.createArticle(vm.article);
        }
        $mdDialog.cancel();
      }
      //update article
      else{
        if(vm.image){
          STORE_articles.updateImage(articleId, vm.image);
        }
        STORE_articles.updateArticle(articleId, vm.article);
        $mdDialog.cancel();
      }
    }

    vm.showConfirmRemove = function(){
      var confirm = $mdDialog.confirm()
          .title('删除商品')
          .textContent('你确定要删除这个商品？')
          .ok('删除')
          .cancel('取消');
      $mdDialog.show(confirm).then(function() {
        vm.remove();
      });
    }

    vm.remove = function(){
      STORE_articles.removeArticle(articleId);
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }
})();
