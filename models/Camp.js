const mongoose = require('mongoose')

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
      type:String,
      required: true
   }
})

module.exports = mongoose.model('Camp', campSchema)