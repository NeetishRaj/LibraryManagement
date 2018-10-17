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
  

    // Handling GET requests    
    router.post("/usersignup", (req, res) => {
        console.log("Adding new user to Database");
        
        userDb.addUser(req.body, function(addStatus){
            if (addStatus){
                console.log("Successfully added to DB");
                res.send("Succesfully added to Database");
            } else {
                res.send("Something went wrong while doing your registration");
            }
        });
    });


});


module.exports = router;
