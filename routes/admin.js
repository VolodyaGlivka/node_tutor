const express = require('express');
const router = express.Router();

// controllers
const BookController = require('../controllers/book');
const AuthController = require('../controllers/auth');

router.get('/books', BookController.getBooks);
router.post('/book', BookController.postBook);
router.put('/book', BookController.putBook);

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.auth);

router.get('/books/:id', BookController.getBook);

module.exports = router;
