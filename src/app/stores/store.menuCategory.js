(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_menuCategory', STORE_menuCategory)

  function STORE_menuCategory($q, Util, $log){

    var store =
    {
      menuCategory:[],

      event: new EventEmitter(),

      EVENTS: {
        change: "change"
      },

      endpoint: "menuCategory",
      /**
       * get all categories
       * @method getCategories
       * @return {$q} promise
       */
      getMenuCategory:function(){
        var that = this;
        var deferred = $q.defer();

        firebase.database().ref()
        .child(this.endpoint)
        .once("value", function(snapshot){
          if(snapshot.val() === null){
            deferred.reject();
          }
          else{
            that.menuCategory = snapshot.val();
            deferred.resolve(that.categories);
          }
        });
        return deferred.promise;
      },

      updateMenuCategory: function(data){
        firebase.database().ref(this.endpoint)
        .set(data)
      },

    }

    //sync data
    firebase.database().ref(store.endpoint)
    .on('value', function(data) {
      //refresh data
      store.menuCategory = data.val();
      Util.traverse(store.menuCategory, function(key, value){
        //if is a category add categories
        if(value.id && !value.categories){
            value.categories = [];
        }
      });

      //fire change event
      store.event.trigger(store.EVENTS.change);
    });

    return store;
  }
})();
