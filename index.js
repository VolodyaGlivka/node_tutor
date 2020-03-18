const express = require('express');

const app = express();

app.use((req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  const url = req.url;
  console.log('url', url);
  res.send({ url });
});

app.listen(8000);
