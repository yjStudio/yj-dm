(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_menuCategory', STORE_menuCategory)

  function STORE_menuCategory($q, $log){

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
            that.categories = snapshot.val();
            deferred.resolve(that.categories);
          }
        });
        return deferred.promise;
      },

      updateMenuCategory: function(id, data){
        firebase.database().ref(this.endpoint +"/"+ id)
        .update(data)
      },

    }

    //sync data
    firebase.database().ref("categories")
    .on('value', function(data) {
      //refresh data
      store.categories = data.val();

      //fire change event
      store.event.trigger(store.EVENTS.change);
    });

    return store;
  }
})();
