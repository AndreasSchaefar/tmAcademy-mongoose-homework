const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 60,
  },
  role: {
    type: String,
    enum: ['admin', 'writer', 'guest'],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  numberOfArticles: {
    type: Number,
    default: 0,
    required: false,
  },
  nickName: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
