import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().max(150).required().messages({
    'string.empty': 'Description cannot be empty',
    'string.max': 'Description cannot exceed 20 characters',
    'strig.required': 'Description is required'
  })
});
