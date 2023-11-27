const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref:'User',
    index: true,
    required: true
    },
  picture: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('User', userSchema)