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
	function (data, $window, $state) {

		var self = this;
		this.user = {};
		this.showLogInForm = true;
		this.showUserDashBoard = false;

		this.toggleDashboard = function () {
			self.showUserDashBoard = !self.showUserDashBoard;
			self.showLogInForm = !self.showLogInForm;
		};

		this.logIn = function () {

			self.user.lastLogin = $window.Date.now();
			data.logInUser(self.user).then(
				function (responseData) {

					if (responseData.success) {
						alert(responseData.message);
						self.toggleDashboard();
						self.user = responseData.user;

						// Display the books
						self.updateBookList();
					} else {
						alert(responseData.message);
					}
				}
			);
		}

		this.books = [];

		this.updateBookList = function () {
			data.getBooks().then(
				function (responseData) {
					if (responseData.success) {
						self.books = $window.JSON.parse(responseData.books);
					} else {
						if (responseData.message) {
							alert(responseData.message);
						} else {
							alert("Cannot connect to server");
						}
					}
				}
			);
		};

		this.checkout = function(idx){
			
			const deductedCount = $window.parseInt(self.books[idx].count) - 1;
			
			if (deductedCount >= 0){
				data.updateBook(
					self.books[idx].name,
					{count: deductedCount}).then(
						function(responseData){
							if (responseData.success) {
								alert("One copy of " + self.books[idx].name + " bought");
								self.updateBookList();
							} else {
								if (responseData.message) {
									alert(responseData.message);
								} else {
									alert("Cannot connect to server");
								}
							}
		
						})
			} else {
				alert(self.books[idx].name + " book sold out completely");
			}
		}



	}
]);