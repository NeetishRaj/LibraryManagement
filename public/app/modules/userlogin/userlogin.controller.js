/*eslint-disable*/

/*
* controller for the User Login and dashboard view
* @alias: "userlogin"
* Note that wrapping dependencies and controller function in "[]" helps to
* preserve the code during minification
*/
angular.module("designEditorApp").controller("userLoginController", [
    "data",
    "$window",
    function(data, $window, $state){
  
      var self = this;
      this.user = {};
      this.showLogInForm = true;
      this.showUserDashBoard = false;
  
      this.toggleDashboard = function(){
        self.showUserDashBoard = !self.showUserDashBoard;
        self.showLogInForm = !self.showLogInForm;
      };

      this.logIn = function(){

        self.user.lastLogin = $window.Date.now();
        data.logInUser(self.user).then(
          function(responseData){

            if(responseData.success){
                alert(responseData.message);
                self.toggleDashboard();
                self.user = responseData.user;
                                
            } else {
                alert(responseData.message);
            }
          }
        );
      }

  
    }
  ])
  