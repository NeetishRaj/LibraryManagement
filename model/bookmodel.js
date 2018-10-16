const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const collectionName = "book";


function BookDAO(db) {
    this.db = db;

    this.getBook = function (name, callback) {

        this.db.collection(collectionName).findOne({
                name
            },
            function (err, result) {
                assert.equal(err, null);
                callback(result);
            }
        );
    }

    this.addBook = function (Book, callback) {

        this.db.collection(collectionName).insertOne(
            Book,
            function (err, addStatus) {
                assert.equal(err, null);
                callback(addStatus);
            }
        );
    };

    this.updateBook = function(name, callback){
        //
    }
}

module.exports = BookDAO;