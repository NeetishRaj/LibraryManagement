/*eslint-disable*/

/*
 * Data service
 * Service exposed with the name "data"
 * This service provide methods that interacts with the MySQL backend
 * and fetches the data from the Rest api using angular's $http service
 */

// IIFE to create closure and avoid polluting global space
(function () {

  var designEditorApp = angular.module("designEditorApp");

  function dataFactory($http) {

    if (!$http) {
      console.log("cant access angular's http service");
      return null;
    }

    var data = {};

    data.getDesign = function (id) {
      var promise1 = $http.get("/design/getDesign/" + id);
      var promise2 = promise1.then(function (response) {
        return response.data;
      });

      return promise2;
    };

    data.addUser = function (userData) {
      userData = angular.toJson(userData);
      console.log("sending data");

      return $http.post("/usersignup", userData).
      then(function (response) {
        return response.data;
      });
    };

    data.logInUser = function (userData) {
      userData = angular.toJson(userData);
      console.log("sending data");

      return $http.post("/userlogin", userData).
      then(function (response) {
        return response.data;
      });
    };

    data.logInAdmin = function (queryInfo) {
      userData = angular.toJson(queryInfo || {});
      console.log("Fetching Users");

      return $http.post("/adminlogin", queryInfo).
      then(function (response) {
        return response.data;
      });
    };

    data.addBook = function (book) {
      book = angular.toJson(book);
      console.log("adding a book");

      return $http.post("/adminlogin/book", book).
      then(function (response) {
        return response.data;
      });
    };

    data.getBooks = function(){
      console.log("Fetching book list");

      return $http.get("/adminlogin/book").
      then(function (response) {
        return response.data;
      });
    }




    return data;
  }

  // Define dependencies for dataFactory
  dataFactory.$inject = ['$http'];

  // Register factory with our main angular app
  designEditorApp.factory('data', dataFactory);

})();
