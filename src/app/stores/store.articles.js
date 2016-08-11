(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_articles', STORE_articles)

  function STORE_articles($q, Util, $log){

    var store =
    {
      articles:{},

      ref: firebase.database().ref("articles"),

      model: {
        name: false,
        imageUrl: false,
        description: false,
        createdDate: false,
        modifiedDate: false,
        serial: false
      },

      event: new EventEmitter(),

      EVENTS: {
        change: "change"
      },

      endpoint: "articles",

      getArticles: function(){
        var that = this;
        var deferred = $q.defer();

        this.ref.once("value", function(snapshot){
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

        this.ref.push(Util.parseModel(this.model, object));
      },

      updateArticle: function(id, object){
        if(!object){
          $log.warn("Dont have article object");
          return;
        }

        this.ref.child(id)
        .update(Util.parseModel(this.model, object));
      },

      uploadImage : function(id, file){
        var fileName = id + ".jpg";
        return Util.uploadImage(this.endpoint, fileName, file);
      },

      removeArticle: function(id){
        this.ref.child(id)
        .remove();
      }
    }

    //sync data
    store.ref.on('value', function(data) {
      //refresh data
      store.articles = data.val();

      //fire change event
      store.event.trigger(store.EVENTS.change);
    });

    return store;
  }
})();
