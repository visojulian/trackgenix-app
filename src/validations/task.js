import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().max(150).required().messages({
    'string.empty': 'Description cannot be empty',
    'string.max': 'Description cannot exceed 150 characters',
    'string.required': 'Description is required'
  })
});
