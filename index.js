const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Local packages
const ErrorController = require('./controllers/error');
const Router = require('./routes/admin');
const AuthRouter = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', Router);
app.use('/api', AuthRouter);
app.use(ErrorController.error404);

mongoose
  .connect('mongodb://localhost:27017/my_database')
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    throw new Error(err);
  });
