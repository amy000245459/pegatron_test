const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pictureSchema = new Schema({
  picture: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Picture', pictureSchema)