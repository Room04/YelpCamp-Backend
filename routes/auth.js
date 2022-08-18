const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express()
const User = require('../models/User')
const {registerValidation, loginValidation} = require('./validations/authvalidation')
const auth = require('../middlewares/authmiddleware')

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
      res.status(400).json({status: 1, message: error})
   }
})

// log in user
router.post('/login', async (req, res) => {

   // validate user input
   const { error } = registerValidation(req.body)
   if(error) return res.status(400).json({ status: 1, error: error.details[0].message})

   try {
      // get user
      const resUser = await User.findOne({ username: req.body.username })
      // check if user exists
      if(!resUser) return res.status(404).json({ status: 1, message: "User does not exist"})
      
      // check if passwords match
      const pwd = resUser.password
      if(!bcrypt.compareSync(req.body.password, pwd)) return res.status(403).json({ status: 1, message: "Invalid password" })

      // create json-token
      const token = jwt.sign({ _id: resUser._id }, process.env.TOKEN_SECRET)
      // set the token to the headers
      res.header('auth-token', token)

      // return login succes message
      res.status(200).json({ status: 0, token: token })
   } catch (error) {
      res.status(400).json({status: 1, error: error})
   }

})

// logout user
router.post('/logout', auth, (req, res) => {
   delete req.header['auth-token']
   
   // return succesful logout message
   res.status(200).json({ status: 0, message: "Logged out" })
})


// TODO: sign in a user

module.exports = router