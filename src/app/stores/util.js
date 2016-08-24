(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('Util', Util)

  function Util($q, $log, toastr){

    var util =
    {

      /**
       * extract image extension
       * @method getImageExtension
       * @param {string} fileName
       * @return {match} extensionMatch
       */
      getImageExtension: function(fileName){
        var reg = /\.(jpe?g|png|gif|bmp)$/i;
        var match = reg.exec(fileName);
        return match;
      },

      /**
       * asign value to model
       * @method parseModel
       * @param {object} model
       * @param {object} value
       * @return {object} copyOfModel
       */
      parseModel: function(originModel, values){
        var model = angular.copy(originModel);
        if(values == undefined) return model;
        for(var key in values){
          var new_values = values[key];
          if (key in model){
            model[key]=new_values;
          }
        }
        return model;
      },

      /**
       * parser all json nodes
       * @method traverse
       * @param {object} o
       * @param {function} func
       */
      traverse: function (o,func) {
        var that = this;
        for (var i in o) {
          func.apply(this,[i,o[i]]);
          if (o[i] !== null && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            that.traverse(o[i],func);
          }
        }
      },

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
