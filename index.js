const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const Router = require('./routes/admin');

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

app.use((req, res, next) => {
  res.status(404).send(`<h1>Page not found</h1>`);
});

app.listen(8000);
