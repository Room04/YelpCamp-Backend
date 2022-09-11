const jwt =  require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

   // check for token
   const token = req.header('auth-token')
   if(!token) return res.status(401).json({error: "Access Denied"})

   // verify auth token
   try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      next()
   } catch (error) {
      res.status(400).json({ error: "Invalid token" })
   }
}

module.exports = authMiddleware