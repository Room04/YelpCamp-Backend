const express = require('express')
const router = express.Router()
const Camp = require('../models/Camp')
const auth = require('../middlewares/authmiddleware')
const user = require('../middlewares/usermiddleware')
const {newCampValidation} = require('./validations/campsvalidation')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// get all campgrounds
router.get('/', async (req, res) => {
   try {
      const campgrounds = await Camp.find()
      if(!campgrounds) return res.status(200).json({message: "No campgrounds yet"})

      res.status(200).json(campgrounds)
   } catch (error) {
      res.status(404).json({error: error.message})
   }
})

// create new campground
router.post('/new', auth, user, upload.single('image'), async (req, res) => {

   // check for errors
   const { error } = newCampValidation({image: req.file, camp_details: req.body})
   if(error) return res.status(400).json({ error: error.details[0].message })

   // add new campground
   try{
      const newCamp = await Camp.create({
         campname: req.body.name,
         price: req.body.price,
         image: `uploads/${req.file.filename}`,
         description: req.body.description,
         created_by: req.username
      })
      res.status(200).json(newCamp)
   } catch(error) {
      res.status(404).json({ error: error.message})
   }
})

module.exports = router