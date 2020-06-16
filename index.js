const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
// Local packages
const ErrorController = require('./controllers/error');
const Router = require('./routes/admin');
const connection = require('./utils/database');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/admin', Router);

app.use(ErrorController.error404);

connection.mongoConnect(() => {
  app.listen(8000);
});
