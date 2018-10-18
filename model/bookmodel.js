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

    this.getBooks = function (callback) {

        const books = [];
        this.db.collection("book")
            .find({})
            .project({"_id": 0})
            .sort({"name": 1})
            .forEach(
                function(doc){
                    books.push(doc)
                },
                function(err){
                    assert.equal(err, null);
                    callback(books);
                }
            );
    }

    this.addBook = function (book, callback) {

        this.db.collection("book").insertOne(
            book,
            function (err, addStatus) {
                assert.equal(err, null);
                callback(addStatus);
            }
        );
    };

    this.updateBook = function(name, book, callback){
        
        this.db.collection("book").updateOne(
            {name},
            {$set: book},
            function(err, updateStatus){
                assert.equal(err, null);
                callback(updateStatus);
            }
        );
    };

    this.removeBook = function(name, callback){
        
        this.db.collection("book").deleteOne(
            {name},
            function(err, deleteStatus){
                assert.equal(err, null);
                callback(deleteStatus);
            }
        );
    };
}

module.exports = BookDAO;