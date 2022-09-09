const express = require('express')
const router = express.Router()
const Camp = require('../models/Camp')
const auth = require('../middlewares/authmiddleware')
const user = require('../middlewares/usermiddleware')
const creator = require('../middlewares/creatormiddleware')
const { newCampValidation, searchValidation } = require('./validations/campsvalidation')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// get all campgrounds
router.get('/', async (req, res) => {
   try {
      const campgrounds = await Camp.find({}, {"created_by.id": 0, __v:0})
      if(!campgrounds) return res.status(200).json({message: "No campgrounds yet"})

      res.status(200).json(campgrounds)
   } catch (error) {
      res.status(404).json({error: error.message})
   }
})

// search for campground
router.get('/search', async (req, res) => {
   // check for errors
   const { error } = searchValidation(req.body)
   if(error) return res.status(400).json({error: error.details[0].message})

   // search forcampground
   try {
      const campgrounds = await Camp.find(
         { 
            $or: [
               { campname: { $regex: req.body.query, $options: 'i' } }, 
               { description: { $regex: req.body.query, $options: 'i' } }
            ] 
         }, {"created_by.id": 0, __v:0}
      )

      res.status(200).json(campgrounds)
   } catch (error) {
      res.status(404).json({error: "An error occured", msg: error.message})
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
         created_by: {
            id: req.user,
            username: req.username
         }
      })
      res.status(200).json(newCamp)
   } catch(error) {
      res.status(404).json({ error: error.message})
   }
})

router.route('/:id')
   // get single campground
   .get(auth, async (req, res) => {
      try {
         const campground = await Camp.findById(req.params.id, {"created_by.id": 0, __v:0})
         res.status(200).json(campground)
      } catch (error) {
         res.status(404).json({error: "Campground not found"})
      }
   })
   // update campground
   .patch(auth, user, creator, upload.single('image'), async (req, res) => {
      
      // check for errors
      const { error } = newCampValidation({image: req.file, camp_details: req.body})
      if(error) return res.status(400).json({ error: error.details[0].message })

      const filter = { _id: req.params.id }
      const camp = {
         campname: req.body.name,
         price: req.body.price,
         image: `uploads/${req.file.filename}`,
         description: req.body.description
      }

      try {
         const newCamp = await Camp.findOneAndUpdate(filter, camp)
         const updatedCamp = await Camp.findById(req.params.id, {"created_by.id": 0, __v:0})
         res.status(200).json(updatedCamp)
      } catch (error) {
         res.status(404).json({ error: error.message })
      }
   }) 

module.exports = router