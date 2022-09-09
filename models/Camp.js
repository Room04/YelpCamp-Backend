const mongoose = require('mongoose')
const User = require('./User')

const campSchema = mongoose.Schema({
   campname: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   created_by: {
      id: {
         type: mongoose.Schema.ObjectId,
         ref: User,
         required: true,
         index: true
      },
      username: {
         type: String,
         required: true
      }
   },
   created_on: {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('Camp', campSchema)