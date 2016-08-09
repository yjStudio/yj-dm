(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_articles', STORE_articles)

  function STORE_articles($q, Util, $log){

    var store =
    {
      articles:{},

      event: new EventEmitter(),

      EVENTS: {
        change: "change"
      },

      endpoint: "articles",

      getArticles: function(){
        var that = this;
        var deferred = $q.defer();

        firebase.database().ref()
        .child(this.endpoint)
        .once("value", function(snapshot){
          if(snapshot.val() === null){
            deferred.reject();
          }
          else{
            that.articles = snapshot.val();
            deferred.resolve(that.articles);
          }
        });
        return deferred.promise;
      },

      createArticle: function(object){
        if(!object){
          $log.warn("Dont have article object");
          return;
        }
        object.createdDate = Date.now();
        object.modifiedDate = Date.now();

        var newItemRef = firebase.database().ref(this.endpoint)
        .push(object);

        newItemRef.val = object;
        return newItemRef;
      },

      updateArticle: function(id, object){
        if(!object){
          $log.warn("Dont have article object");
          return;
        }
        object.modifiedDate = Date.now();
        firebase.database().ref(this.endpoint)
        .child(id)
        .update(object);
      },

      uploadImage : function(id, file){
        var fileName = id + ".jpg";
        return Util.uploadImage(this.endpoint, fileName, file);
      },

      removeArticle: function(id){
        firebase.database().ref(this.endpoint)
        .child(id)
        .remove();
      }

    }

    //sync data
    firebase.database().ref(store.endpoint)
    .on('value', function(data) {
      //refresh data
      store.articles = data.val();

      //fire change event
      store.event.trigger(store.EVENTS.change);
    });

    return store;
  }
})();
