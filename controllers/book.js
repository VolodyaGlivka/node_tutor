const Book = require('../models/book');

class BookController {
  static getBooks(req, res) {
    Book.getAll().then((result) => {
      res.send(result);
    });
  }

  static postBook(req, res) {
    const { title, description, book_url, img_url } = req.body;
    const book = new Book(
      title,
      description,
      book_url,
      img_url,
      null,
      req.user._id
    );
    book.save().then(() => {
      res.send(200);
    });
  }

  static putBook(req, res) {
    const { id, title, description, book_url, img_url } = req.body;
    const book = new Book(title, description, book_url, img_url, id);
    book.save().then(() => {
      res.send(200);
    });
  }

  static deleteBook(req, res) {
    const id = req.params.id;
    Book.destroy(id).then(() => {
      res.send(200);
    });
  }

  static getBook(req, res) {
    const id = req.params.id;
    Book.getSingleBook(id).then((result) => {
      res.send(result);
    });
  }
}

module.exports = BookController;
