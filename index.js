const express = require('express');

const app = express();

// function that we passed will be executed for every incoming request
// next allow us to continue and use anouther middleware
app.use((req, res, next) => {
  console.log('hello');
  next();
});

// with next() in previous use() we get access to execute anouther middleware
app.use((req, res, next) => {
  console.log('world');
  // here we need to send responce as we don't have next in this function
  res.send('hello world');
});

// we don't reach this code
// as previous middleware don't allow us to execute next line of code
app.get('/', (req, res) => {
  const uri = req.url;
  console.log('uri', uri);
});

app.listen(8000);
