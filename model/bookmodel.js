const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


function BookDAO(db) {
    this.db = db;

    this.getBook = function (name, callback) {

        this.db.collection("book").findOne(
            {name},
            function (err, result) {
                assert.equal(err, null);
                callback(result);
            }
        );
    }

    this.addBook = function (Book, callback) {

        this.db.collection("book").insertOne(
            Book,
            function (err, addStatus) {
                assert.equal(err, null);
                callback(addStatus);
            }
        );
    };

    this.updateBook = function(Book, callback){
        
        this.db.collection("book").updateOne(
            Book,
            function(err, updateStatus){
                assert.equal(err, null);
                callback(updateStatus);
            }
        )
    };

    this.removeBook = function(name, callback){
        
        this.db.collection("book").deleteOne(
            {name},
            function(err, deleteStatus){
                assert.equal(err, null);
                callback(deleteStatus);
            }
        )
    };
}

module.exports = BookDAO;