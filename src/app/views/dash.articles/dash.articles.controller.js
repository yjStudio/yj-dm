(function() {
  'use strict';

  angular
    .module('yjDm')
    .controller('DashArticlesController', DashArticlesController);

  /** @ngInject */
  function DashArticlesController($log, $state, $mdDialog, Upload, STORE_articles){

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

    // for multiple files:
    vm.uploadFiles = function (files, error) {
      var file;
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
