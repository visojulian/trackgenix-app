import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email needs to be a valid email address',
      'string.required': 'Email is required'
    }),
  password: Joi.string().min(8).alphanum().trim().required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must have at least 8 characters',
    'string.alphanum': 'Password cannot contain special characters',
    'string.required': 'Password is required'
  })
});
