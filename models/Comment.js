const mongoose = require('mongoose')
const User = require('./User')
const Camp = require('./Camp')

const commentSchema = mongoose.Schema({
   campground: {
      id: {
         type: mongoose.Schema.ObjectId,
         ref: Camp,
         required: true,
         index: true
      }
   },
   comment: {
      type: String,
      required: true,
      min: 1,
      max: 255
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
   }
})

module.exports = mongoose.model('Comment', commentSchema)