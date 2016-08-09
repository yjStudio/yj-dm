(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('Util', Util)

  function Util($q, $log, toastr){

    var util =
    {
      /**
       * upload image function
       * @param {string} directory
       * @param {string} fileName
       * @param {blob} file
       * @return {promise}
       */
      uploadImage: function(directory, fileName, file){

        var deferred = $q.defer();
        $log.debug()
        var uploadTask = firebase.storage().ref(directory).child(fileName).put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on("state_changed",
        function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = parseInt(progress);
          if(progress != 100){
            $log.debug('Upload file is ' + progress + '% done');
            toastr.info(progress + '%', "文件" + fileName +"上传中");
          }

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              $log.debug('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              $log.debug('Upload is running');
              break;
          }
        },
        function(error) {
          deferred.reject();
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          deferred.resolve(downloadURL);
          toastr.success("上传完成", "文件" + fileName +"上传中");
        });

        return deferred.promise;
      }
    }

    return util;
  }
})();
