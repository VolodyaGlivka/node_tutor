const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const Book = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  book_url: String,
  img_url: String,
  pre_mongified_id: {
    type: Number,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Book', Book);
