const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const commentValidation = require('./validations/commentvalidation')
const auth = require('../middlewares/authmiddleware')
const user = require('../middlewares/usermiddleware')

router.get('/:camp_id', auth, async (req, res) => {
   // Get all comments for a campground
   try {
      const comments = Comment.find({"campground.id": req.params.camp_id}, {_id: 0, "created_by.id": 0})
      res.status(200).json(comments)
   } catch (error) {
      res.status(404).json({error: "An error occured.Try again later"})
   }
})

router.post('/new/:camp_id', auth, user, async (req, res) => {

   // validate body object
   const { error } = commentValidation(req.body)
   if(error) return res.status(400).json({error: error.details[0].message})

   // create comment object
   const comment = {
      campground: {
         id: req.params.camp_id
      },
      comment: req.body.comment,
      created_by: {
         id: req.user,
         username: req.username
      }
   }

   // add comment to database
   try {
      const newComment = await Comment.create(comment)
      res.status(200).json({message: "Created new comment"})
   } catch (error) {
      res.status(404).json({error: "An error occured. Try again later"})
   }
})

module.exports = router