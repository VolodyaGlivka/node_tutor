const Book = require('../models/book');

class BookController {
  static getBooks(req, res) {
    Book.getAll().then(result => {
      res.send(result);
    });
  }

  static postBook(req, res) {
    const { title, description, book_url, img_url } = req.body;
    const book = new Book(title, description, book_url, img_url);
    book.save().then(result => {
      res.send(result);
    });
  }

  static putBook(req, res) {
    const { id, title, description, book_url, img_url } = req.body;
  }

  static deleteBook(req, res) {}

  static getBook(req, res) {
    const id = req.params.id;
  }
}

module.exports = BookController;
