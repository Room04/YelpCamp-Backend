const Joi = require('@hapi/joi')

const newCommentValidation = data => {
   const schema = Joi.object({
      comment: Joi.string().required()
   })

   return schema.validate(data)
}

module.exports = newCommentValidation