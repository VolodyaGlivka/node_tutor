const express = require('express');
// return directory where index.js is located
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();

// controllers
const BookController = require('../controllers/books');
const AuthController = require('../controllers/auth');

router.get('/books', BookController.getBooks);
router.post('/book', BookController.postBook);
router.put('/book', BookController.putBook);

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.auth);

router.get('/books/:id', BookController.getBook);

router.get('/test', (req, res) => {
  // __dirname give us folder where current file is located
  // Bad
  // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
  // Good
  res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

module.exports = router;
