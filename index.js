const express = require('express')
require('dotenv/config')

// create app
const app = express()

// handle get route
app.get('/', (req, res) => {
   res.status(200).json({ message: "hello from YelpCamp" })
})

// set app to listen on port
app.listen(process.env.PORT || 5560)