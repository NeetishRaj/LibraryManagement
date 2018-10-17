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
}

module.exports = UserDAO;