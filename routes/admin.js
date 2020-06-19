const express = require('express');
const router = express.Router();
const decode = require('jwt-decode');

const TokenModel = require('../models/token');
const Token = require('../token_config/tokenFunctionality');
// controllers
const BookController = require('../controllers/book');

router.use((req, res, next) => {
  const bearerToken = req.headers.authorization.split(' ')[1];
  if (!bearerToken) {
    return res.status(403).json('No token provided');
  }
  Token.verifyToken(bearerToken, 'secretToken', (err) => {
    if (err) {
      return res.status(403).json('Invalid token provided');
    }
    next();
  });
});

router.get('/books', BookController.getBooks);
router.post('/book', BookController.postBook);
router.put('/book', BookController.putBook);

router.get('/books/:id', BookController.getBook);

module.exports = router;
