const mongoose = require('mongoose');

const Book = require('../models/book');
const Books_Chapter = require('../models/chapter');

class BookController {
  static getBooks(req, res) {
    Book.find()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postBook(req, res) {
    const { title, description, book_url, img_url, userId } = req.body;
    const book = new Book({
      title,
      description,
      book_url,
      img_url,
      userId,
    });
    book
      .save()
      .then(() => {
        res.send(200);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static putBook(req, res) {
    const { id, title, description, book_url, img_url, userId } = req.body;
    Book.findOne({ pre_mongified_id: id, userId })
      .then((book) => {
        book.title = title;
        book.description = description;
        book.book_url = book_url;
        book.img_url = img_url;
        book
          .save()
          .then(() => {
            res.send(200);
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static deleteBook(req, res) {
    const id = req.params.id;
    Book.deleteOne({ pre_mongified_id: id })
      .then(() => {
        res.send(200);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static getBook(req, res) {
    const id = req.params.id;
    Book.findOne({ pre_mongified_id: id })
      .then((result) => {
        Books_Chapter.find({ book_id: result['_id'] }).then((chapters) => {
          res.send({ result, chapters });
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = BookController;
