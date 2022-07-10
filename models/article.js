const mongoose = require('mongoose');
const {Schema} = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 400,
    index: true,
  },
  subtitle: {type: String, minlength: 5},
  description: {type: String, required: true, minlength: 5, maxlength: 5000},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  category: {
    type: String,
    required: true,
    enum: ['sport', 'games', 'history'],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('Article', articleSchema);
