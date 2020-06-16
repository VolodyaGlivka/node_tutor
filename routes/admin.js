const express = require('express');
const router = express.Router();

// controllers
const BookController = require('../controllers/book');
// const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');

router.get('/books', BookController.getBooks);
router.post('/book', BookController.postBook);
router.put('/book', BookController.putBook);

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.auth);

router.get('/books/:id', BookController.getBook);

router.delete('/users/:id', BookController.deleteBook);

// router.get('/users', UserController.getUsers);
// router.post('/user', UserController.postUser);
// router.put('/user', UserController.putUser);

// router.get('/user/:id', UserController.getUser);

// router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
