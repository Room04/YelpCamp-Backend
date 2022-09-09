const Joi = require('@hapi/joi')

// validate data when creating new campground
const newCampValidation = data => {
   const schema = Joi.object({
      image: Joi.object(),
      camp_details: Joi.object({
         name: Joi.string()
            .required()
            .min(2),
         price: Joi.number()
            .required(),
         description: Joi.string()
            .required()
      })
   })

   return schema.validate(data)
}

const searchValidation = data => {
   const schema = Joi.object({
      query: Joi.string().required()
   })

   return schema.validate(data)
}

module.exports.newCampValidation = newCampValidation
module.exports.searchValidation = searchValidation