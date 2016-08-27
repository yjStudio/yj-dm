(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_categories', STORE_categories)

  function STORE_categories($q, $log, STORE_menuCategory, Util){

    var store =
    {
      categories:{},

      ref: firebase.database().ref("categories"),

      EVENTS: {
        change: "change"
      },

      endpoint: "categories",
      /**
       * get all categories
       * @method getCategories
       * @return {$q} promise
       */
      getCategories:function(){
        var that = this;
        return this.ref.once("value", function(snapshot){
            that.categories = snapshot.val();
        });
      },

      /**
       * get all categories
       * @method createCategory
       * @param {string} createCategory
       * @return {$q} promise
       */
      createCategory:function(categoryName){
        // should declare name
        if(!categoryName){
          $log.warn("Dont have category name");
          return;
        }

        this.findCategoryByName(categoryName)
        .then(function(){
          $log.warn("just exist this categories")
        })
        //if not exist create new
        .catch(function(){
          firebase.database().ref("categories/").push({name:categoryName});
        })
      },

      updateCategory: function(id, data){
        firebase.database().ref(this.endpoint +"/"+ id)
        .set(data)
      },

      removeCategory: function(id){
        firebase.database().ref(this.endpoint +"/"+ id)
        .remove();

        //remove items of STORE_menuCategory
        STORE_menuCategory.ref.once("value", function(snapshot){
          var menu = snapshot.val();

          for(var key in menu){
            if(menu[key].id == id){
              menu.splice(key,1);
              break;
            }

            if(menu[key].categories){
              var submenu = menu[key].categories
              for(var key2 in submenu){
                if(submenu[key2].id == id){
                  submenu.splice(key2,1);
                  break;
                }
              }
            }
          }
          STORE_menuCategory.ref.set(menu);
        })
      },

      /**
       * search if exist catagory name
       * @method findCategoryByName
       * @param {string} categoryName
       * @return {$q} promise
       */
      findCategoryByName: function(categoryName){

        var deferred = $q.defer();

        firebase.database().ref()
        .child("categories")
        .orderByChild("name")
        .equalTo(categoryName)
        .once("value", function(snapshot){
          if(snapshot.val() === null){
            deferred.reject();
          }
          else{
            deferred.resolve(snapshot.val());
          }
        })

        return deferred.promise;
      }
    }

    Events(store);

    //sync data
    store.ref.on('value', function(data) {
      //refresh data
      store.categories = data.val();

      //fire change event
      store.emit(store.EVENTS.change);
    });

    return store;
  }
})();
