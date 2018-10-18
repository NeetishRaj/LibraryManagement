/*
 * Title: routes/home.js
 * Description: home.js is route handler for the home page for our application
 *  it ll handle all the HTTP requests for "/home" or "/" roots
 */

// Dependencies
const express = require('express');
const router = require('express').Router();
const UserDAO = require('../model/usermodel.js');
const BookDAO = require('../model/bookmodel.js');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// TODO: DB URL must be saved in config file
const dbUrl = "mongodb://neetish:abcde123@ds233323.mlab.com:33323/library";
const dbName = "library";

MongoClient.connect(dbUrl, {"useNewUrlParser": true}, function(err, client){

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    const userDb = new UserDAO(db);
    const bookDb = new BookDAO(db);
  

    router.post("/usersignup", (req, res) => {
        console.log("Adding new user to Database");

        userDb.getUser(req.body.email, function(userData){
            if (userData) {
                res.send({
                    "message": "User with this email already exists",
                    "success": false
                });
            } else {
                userDb.addUser(req.body, function(addStatus){
                    if (addStatus){
                        console.log("Successfully added to DB");
                        res.send({
                            "message": "Succesfully added to Database",
                            "success": true
                        });
                    } else {
                        res.send({
                            "message": "Something went wrong while doing your registration",
                            "success": false
                        });
                    }
                });
            }
        });
        
    });


    router.post("/userlogin", (req, res) => {
        console.log("Matching User Login Credentials");
        
        userDb.getUser(req.body.email, function(userData){
            
            if (userData && req.body.password === userData.password) {

                userDb.updateUser(req.body, function(updateStatus){
                    if (updateStatus){
                        res.send({
                            "message": "User Logged In",
                            "success": true,
                            "user": userData
                        });    
                    } else {
                        res.send({
                            "message": "Failed to login",
                            "success": false
                        });    
                    }
                });

            } else {
                res.send({
                    "message": "Invalid Credentials",
                    "success": false
                });
            }
        });
    });


    router.post("/adminlogin", (req, res) => {
        console.log("Matching Admin Login Credentials");

        if (1 || req.body.email === "admin@admin.com" && req.body.password === "admin") {

            userDb.getUsers(
                {},
                {"firstname":  1},
                function(users){
                    if (users){
                        res.send({
                            "message": "Fetched resources",
                            "success": true,
                            "users": JSON.stringify(users)
                        });        
                    } else {
                        res.send({
                            "message": "Couldnt fetch users information from DB",
                            "success": false
                        });
                    }
                });
        } else {
            res.send({
                "message": "Couldnt fetch users information",
                "success": false
            });
        }

    });

    router.get("/adminlogin/book", (req, res) => {
        console.log("Fetching the complete book list");
      
        bookDb.getBooks(function(bookList){
            if (bookList && bookList.length > 0){
                res.send({
                    "message": "Booklist found",
                    "success": true,
                    "books": JSON.stringify(bookList)
                });
            } else {
                res.send({
                    "message": "Booklist empty or couldnt be found",
                    "success": false
                });
            }
        })
    });

    router.post("/adminlogin/book", (req, res) => {
        console.log("request for Adding new book to collections");

        bookDb.getBook(req.body.name, function(book){
            if (book && book.name === req.body.name){
                res.send({
                    "message": "Book with same name already exists",
                    "success": false
                });        

            } else {

                bookDb.addBook(req.body, function(addStatus){
                    if (addStatus){
                        res.send({
                            "message": "New Book added to collection",
                            "success": true
                        });

                    } else {
                        res.send({
                            "message": "Couldnt add the book to collection",
                            "success": false
                        });
                    }
                });
            }

        });
    });

    router.put("/adminlogin/book/:name", (req, res) => {
        console.log("Request for Updating a book");
      
        const bookName = req.params.name.trim().split("-").join(" ");

        bookDb.getBook(bookName, function(book){
            if (book && book.name === bookName){
                
                bookDb.updateBook(bookName, req.body, function(updateStatus){
                    if (updateStatus){
                        res.send({
                            "message": "Details of the Book updated",
                            "success": true
                        });
                        
                    } else {
                        res.send({
                            "message": "Couldnt update the book in collection",
                            "success": false
                        });
                    }
                });
            } else {
                    res.send({
                        "message": "Book with such name doesnt exist",
                        "success": false
                    });        

            }

        });
    });

    router.delete("/adminlogin/book/:name", (req, res) => {
        console.log("Request for Deleting a book");
      
        const bookName = req.params.name.trim().split("-").join(" ");

        bookDb.getBook(bookName, function(book){
            if (book && book.name === bookName){
                
                bookDb.removeBook(bookName, function(deleteStatus){
                    if (deleteStatus){
                        res.send({
                            "message": "The book deleted from book collection",
                            "success": true
                        });
                        
                    } else {
                        res.send({
                            "message": "Couldnt delete the book in collection",
                            "success": false
                        });
                    }
                });
            } else {
                    res.send({
                        "message": "Book with such name doesnt exist",
                        "success": false
                    });        
            }

        });
    });



});


module.exports = router;
