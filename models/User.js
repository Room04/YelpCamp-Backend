const mongoose = require('mongoose')

// create a user schema
const UserSchema = mongoose.Schema({
   username: {
      type: String,
      min: 3,
      max: 22,
      required: true
   },
   password: {
      type: String,
      min: 6,
      max: 1024,
      required: true
   }
})

module.exports = mongoose.model('User', UserSchema)