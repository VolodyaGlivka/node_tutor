const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const ErrorController = require('./controllers/error');
const Router = require('./routes/admin');

const connection = require('./utils/database');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use('/api/admin', Router);

app.use('/', (req, res, next) => {
  res.render('startScreen', { title: 'Welcoming Page', items: ['first point', 'second point'] });
});

app.use(ErrorController.error404);

connection.mongoConnect(() => {
  app.listen(8000);
});
