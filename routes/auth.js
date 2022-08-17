const express = require('express')
const bcrypt = require('bcryptjs')
const router = express()
const User = require('../models/User')
const {registerValidation} = require('./validations/authvalidation')

// add new user
router.post('/register', async (req, res) => {

   // check for errors
   const { error } = registerValidation(req.body)
   if(error) return res.status(400).json({ status: 1, error: error.details[0].message})

   // check if the username already exists
   const username = await User.findOne({ username: req.body.username })
   if(username) return res.status(400).json({ status: 1, error: "Username already in use" })

   // hash password
   const salt = bcrypt.genSaltSync(10)
   const hashedPwd = bcrypt.hashSync(req.body.password, salt)


   try {
      const savedUser = await User.create({
         username: req.body.username,
         password: hashedPwd
      })

      res.status(200).json({status: 0, user: savedUser})
   } catch (error) {
      res.status(404).json({statu: 1, message: error})
   }
})


// TODO: sign in a user

module.exports = router