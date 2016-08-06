(function() {
  'use strict';

  angular
    .module('yjDm')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
