/*eslint-disable*/

/*
* controller for the User sign up view
* @alias: "signup"
* Note that wrapping dependencies and controller function in "[]" helps to
* preserve the code during minification
*/
angular.module("designEditorApp").controller("signUpController", [
  "data",
  "$window",
  function(data, $window, $state){

    var self = this;
    this.user = {};

    this.signupUser = function(){
      self.signupTime = $window.Date.now();
      data.addUser(self.user).then(
        function(responseData){

          // @TODO: Redirect page to Login on suceess
          alert(responseData);  
        }
      );
    }

  }
])
