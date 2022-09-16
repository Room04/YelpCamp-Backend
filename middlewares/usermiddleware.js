const User = require('../models/User')

const userMiddleware = async (req, res, next) => {
   try{
      const user = await User.findOne({ _id: req.user })
      
      // confirm that a user is returned
      if(!user) return res.status(404).json({error: "user not found"})
      
      req.username = user.username
      next()
   } catch(error) {
      res.status(404).json({ error: error.message })
   } 
}

module.exports = userMiddleware
