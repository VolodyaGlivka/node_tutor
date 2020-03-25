const { getDb } = require('../utils/database');

class Book {
  constructor(title, description, book_url, img_url) {
    this.title = title;
    this.description = description;
    this.book_url = book_url;
    this.img_url = img_url;
  }
  save() {
    const db = getDb();
    return db
      .collection('books')
      .insertOne(this)
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
}

module.exports = Book;
