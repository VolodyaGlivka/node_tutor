const MongoClient = require('mongodb').MongoClient;
let _db;

const uri = 'mongodb://user:orient1@ds151544.mlab.com:51544/heroku_b3qhqhk6';

const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log('Connect');
      _db = client.db('my_database');
      callback();
    })
    .catch((err) => {
      console.log('Error');
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database fount';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
