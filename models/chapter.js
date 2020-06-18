const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const Books_Chapter = new Schema({
  title: {
    type: String,
    required: true,
  },
  original_id: Number,
  pre_mongified_id: {
    type: Number,
    unique: true,
  },
  book_id: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
});

module.exports = mongoose.model('Books_Chapter', Books_Chapter);
