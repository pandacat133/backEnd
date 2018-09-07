const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

const users = [
    {
        "name": {
            "first": "Hester",
            "last": "England"
        },
        "company": "STOCKPOST",
        "email": "hester.england@stockpost.net",
        "phone": "+1 (817) 500-3241",
        "address": "437 Hoyt Street, Crayne, Indiana, 48113"
    },
    {
        "name": {
            "first": "Lawrence",
            "last": "Greene"
        },
        "company": "GENMY",
        "email": "lawrence.greene@genmy.name",
        "phone": "+1 (957) 446-2153",
        "address": "436 Huron Street, Alafaya, Iowa, 27160"
    },
    {
        "name": {
            "first": "Gill",
            "last": "Potter"
        },
        "company": "SARASONIC",
        "email": "gill.potter@sarasonic.biz",
        "phone": "+1 (819) 591-3373",
        "address": "949 Melrose Street, Stockdale, New Mexico, 15440"
    },
    {
        "name": {
            "first": "Guadalupe",
            "last": "Winters"
        },
        "company": "KAGGLE",
        "email": "guadalupe.winters@kaggle.biz",
        "phone": "+1 (844) 435-3323",
        "address": "878 Engert Avenue, Riceville, South Dakota, 67462"
    },
    {
        "name": {
            "first": "Cornelia",
            "last": "Donaldson"
        },
        "company": "ZUVY",
        "email": "cornelia.donaldson@zuvy.org",
        "phone": "+1 (920) 600-2499",
        "address": "539 Kossuth Place, Chemung, Tennessee, 57655"
    },
    {
        "name": {
            "first": "Kay",
            "last": "Weber"
        },
        "company": "FRANSCENE",
        "email": "kay.weber@franscene.ca",
        "phone": "+1 (855) 483-2016",
        "address": "205 Sandford Street, Cassel, Puerto Rico, 52223"
    }
];

// Use connect method to connect to the server
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertOtherUsers(db, () => {
        client.close();
    });
});

const insertDocuments = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

const insertUsers = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('userdemo');
    // Insert some documents
    collection.insertMany([
        {firstName: 'Billy', lastName: 'Bob', age: 26, email: 'billyBob@gmail.com'},
        {firstName: 'Sandra', lastName: 'Dee', age: 26, email: 'sandraDee@gmail.com'},
        {firstName: 'Kitty', lastName: 'Smith', age: 26, email: 'kittySmith@gmail.com'}
    ], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

const insertOtherUsers = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('myUsers');
    // Insert some documents
    collection.insertMany(users, (err, result) => {
        assert.equal(err, null);
        assert.equal(6, result.result.n);
        assert.equal(6, result.ops.length);
        console.log("Inserted 6 documents into the collection");
        callback(result);
    });
};