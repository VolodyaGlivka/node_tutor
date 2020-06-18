const express = require('express');
const router = express.Router();

// controllers
const BookController = require('../controllers/book');

router.use((req, res, next) => {
  const { authorization } = req.headers;
  next();
});

router.get('/books', BookController.getBooks);
router.post('/book', BookController.postBook);
router.put('/book', BookController.putBook);

router.get('/books/:id', BookController.getBook);

module.exports = router;
