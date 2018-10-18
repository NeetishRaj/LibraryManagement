/*eslint-disable*/

/*
 * controller for the Admin Login and dashboard view
 * @alias: "adminlogin"
 * Note that wrapping dependencies and controller function in "[]" helps to
 * preserve the code during minification
 */
angular.module("designEditorApp").controller("adminLoginController", [
    "data",
    "$window",
    function (data, $window, $state) {

        var self = this;
        this.users = [];
        this.info = {};
        this.showLogInForm = true;
        this.showAdminDashBoard = false;

        this.toggleDashboard = function () {
            self.showAdminDashBoard = !self.showAdminDashBoard;
            self.showLogInForm = !self.showLogInForm;
        };

        this.logIn = function () {

            data.logInAdmin(self.info).then(
                function (responseData) {

                    if (responseData.success) {
                        self.users = $window.JSON.parse(responseData.users);

                        self.users.forEach(function (item, index, arr) {
                            arr[index].signupTime = new $window.Date(item.signupTime).toString();
                            arr[index].lastLogin = new $window.Date(item.lastLogin).toString();
                        });

                        self.toggleDashboard();
                        self.updateBookList();

                    } else {
                        alert(responseData.message);
                    }
                });
        }


        // Book implementations

        this.showBookForm = false;
        this.book = {};
        this.books = [];

        this.addBook = function(){
            self.showBookForm = !self.showBookForm
        };

        this.closeBookForm = function(){
            self.showBookForm = !self.showBookForm
        }

        this.updateBookList = function(){
            data.getBooks().then(
                function(responseData){
                    if (responseData.success) {
                        self.books = $window.JSON.parse(responseData.books);
                    } else {
                        if(responseData.message){
                            alert(responseData.message);
                        } else {
                            alert("Cannot conect to server");
                        }
                    }
                }
            );
        };

        this.createBook = function(){
            data.addBook(self.book).then(
                function(responseData){
                    if (responseData.success){
                        alert(responseData.message);
                        self.updateBookList();
                    } else {
                        if(responseData.message){
                            alert(responseData.message);
                        } else {
                            alert("Cannot conect to server");
                        }
                    }
                }
            );
        }


    }
])