/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('yjDm')
    .factory('STORE_categories', STORE_categories)

  function STORE_categories($q, $log){

    var store =
    {
      categories:[],
      endpoint: "categories",

      /**
       * get all categories
       * @method getCategories
       * @return {$q} promise
       */
      getCategories:function(){
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

        this.findCategoryByName("name")
        .then(function(){
          $log.warn("just exist this categories")
        })
        //if not exist create new
        .catch(function(){
          firebase.database().ref("categories/").push({name:categoryName});
        })
      },

      updateCategory: function(){

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

    return store;
  }
})();
