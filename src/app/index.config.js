(function() {
  'use strict';

  angular
    .module('yjDm')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider, $urlRouterProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    //Ui router
    $urlRouterProvider.otherwise('/');

    //custom theme
    $mdThemingProvider.theme('default')
    .primaryPalette('blue');
  }

})();
