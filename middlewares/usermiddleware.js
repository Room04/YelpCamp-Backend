const auth = require('./authmiddleware')
const User = require('../models/User')

const userMiddleware = async (req, res, next) => {
   try{
      const user = await User.findOne({ _id: req.user })
      req.user = user.username
      next()
   } catch(error) {
      res.status(404).json({ error: error.message })
   } 
}

module.exports = userMiddleware