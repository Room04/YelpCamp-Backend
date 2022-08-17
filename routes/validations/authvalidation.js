const Joi = require('@hapi/joi')

const registerValidation = data => {
   const schema = Joi.object({
      username: Joi.string()
         .required()
         .min(3)
         .max(22),
      password: Joi.string()
         .pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
   })

   // return Joi.validate(data, schema)
   return schema.validate(data)
}

module.exports.registerValidation = registerValidation