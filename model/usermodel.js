const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const collectionName = "user";

function UserDAO(db) {
    this.db = db;

    this.getUser = function (email, callback) {

        this.db.collection("user").findOne(
            {email},
            function (err, result) {
                assert.equal(err, null);
                callback(result);
            }
        );
    }

    this.addUser = function (User, callback) {

        this.db.collection("user").insertOne(
            User,
            function (err, addStatus) {
                assert.equal(err, null);
                callback(addStatus);
            }
        );
    }

    this.updateUser = function(user, callback){
        this.db.collection("user").updateOne(
            {"email": user.email},
            {$set: {"lastLogin": user.lastLogin}},
            {"upsert": true, w:1},
            function(err, updateStatus){
                assert.equal(err, null);                
                callback(updateStatus);
            }
        );
    }

    this.getUsers = function(query, sortBy, callback){

        const users = [];
        this.db.collection("user")
            .find(query)
            .project({"_id": 0, "password": 0 })
            .sort(sortBy)
            .forEach(
                function(doc){
                    users.push(doc)
                },
                function(err){
                    assert.equal(err, null);
                    callback(users);
                }
            );
        
    }
}

module.exports = UserDAO;