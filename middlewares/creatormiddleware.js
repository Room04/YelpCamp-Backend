const Camp = require('../models/Camp')

// check if user created the campground
const creatorMiddleware = async (req, res, next) => {
   try {
      const camp = await Camp.findById(req.params.id, {"created_by.id": 1, _id: 0})
      if(camp.created_by.id.toString() != req.user._id) return res.status(401).json({error: "Access denied"}) 
      
      // continue if the campground requested was made by user     
      next()
   } catch (error) {
      res.status(404).json({error: "Campground not found"})
   }
}

module.exports = creatorMiddleware