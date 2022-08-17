const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
require('dotenv/config')

// create app
const app = express()


// connect to database
mongoose.connect(process.env.DB_URI, console.log('connected to DB'))


// add app middleware
app.use(express.json())
// add route middleware
app.use('/api/v1/auth', authRoute)


// handle get route
app.get('/', (req, res) => {
   res.status(200).json({ message: "hello from YelpCamp" })
})

// set app to listen on port
app.listen(process.env.PORT || 5560)