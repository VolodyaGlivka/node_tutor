const MongoClient = require('mongodb').MongoClient;
let _db;

const uri = 'mongodb+srv://vivaldi:orient1997@cluster0-intsd.mongodb.net/test?retryWrites=true&w=majority';

const mongoConnect = callback => {
  MongoClient.connect(uri)
    .then(client => {
      console.log('Connect');
      _db = client.db('my_database');
      callback();
    })
    .catch(err => {
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
