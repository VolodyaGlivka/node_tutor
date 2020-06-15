const { getDb } = require('../utils/database');
const mongodb = require('mongodb');

class Book {
  constructor(title, description, book_url, img_url, id, userId) {
    this.pre_mongified_id = id;
    this.title = title;
    this.description = description;
    this.book_url = book_url;
    this.img_url = img_url;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this.pre_mongified_id) {
      dbOp = db.collection('books').updateOne({ pre_mongified_id: this.pre_mongified_id }, { $set: this });
    } else {
      dbOp = db.collection('books').insertOne({ ...this, pre_mongified_id: Math.random() });
    }
    return dbOp.catch(err => {
      throw err;
    });
  }
  static destroy(id) {
    const db = getDb();
    return db
      .collection('books')
      .deleteOne({ pre_mongified_id: id })
      .catch(err => {
        throw err;
      });
  }

  static getAll() {
    const db = getDb();
    return db
      .collection('books')
      .find()
      .toArray()
      .catch(err => {
        throw err;
      });
  }

  static getSingleBook(id) {
    const db = getDb();
    return db
      .collection('books')
      .findOne({ _id: new mongodb.ObjectId(id) })
      .catch(err => {
        throw err;
      });
  }
}

module.exports = Book;
