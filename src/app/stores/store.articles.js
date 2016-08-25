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

      EVENTS: {
        change: "change"
      },

      endpoint: "articles",

      getArticles: function(){
        var that = this;
        return this.ref.once("value", function(snapshot){
            that.articles = snapshot.val();
        });
      },

      createArticle: function(object){
        if(!object){
          $log.warn("Dont have article object");
          return;
        }
        var model = Util.parseModel(this.model, object)
        model.createdDate = Date.now();
        model.modifiedDate = Date.now();
        return this.ref.push(model);
      },

      createArticleWithImage: function(file, object){
        var newItemRef = this.createArticle(object)
        var id = newItemRef.key;

        this.updateImage(id, file);
      },

      updateArticle: function(id, object){
        if(!object){
          $log.warn("Dont have article object");
          return;
        }

        var model = Util.parseModel(this.model, object)
        model.modifiedDate = Date.now();
        return this.ref.child(id)
        .update(model);
      },

      updateImage : function(id, file){
        var that = this;
        this.uploadImage(id, file).then(function(imageUrl){
          that.ref.child(id).child("imageUrl").set(imageUrl);
        });
      },

      uploadImage : function(id, file){
        var extension = Util.getImageExtension(file.name)[0];
        var fileName = id + extension;
        return Util.uploadImage(this.endpoint, fileName, file);
      },

      removeArticle: function(id){
        return this.ref.child(id)
        .remove();
      }
    }

    Events(store);

    //sync data
    store.ref.on('value', function(data) {
      //refresh data
      store.articles = data.val();

      //fire change event
      store.emit(store.EVENTS.change);
    });

    return store;
  }
})();
