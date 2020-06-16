const MongoClient = require('mongodb').MongoClient;
let _db;

const uri = 'mongodb://localhost:27017/my_database';

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
