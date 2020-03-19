const path = require('path')

// this gives us file with start our application
// in our case it is index.js
module.exports = path.dirname(process.mainModule.filename);
