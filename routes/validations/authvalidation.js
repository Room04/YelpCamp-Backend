const Joi = require('@hapi/joi')

// validate registration data
const registerValidation = data => {
   const schema = Joi.object({
      username: Joi.string()
         .required()
         .min(3)
         .max(22),
      password: Joi.string()
         .required()
         .pattern(RegExp(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/))
         .message("Password must be atleast 8 characters, contain uppercase and lowercase letters and special characters."),
   })

   // return Joi.validate(data, schema)
   return schema.validate(data)
}

// validate login data
const loginValidation = data => {
   const schema = Joi.object({
      username: Joi.string()
         .required(),
      password: Joi.string()
         .required()
   })

   // return Joi.validate(data, schema)
   return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation