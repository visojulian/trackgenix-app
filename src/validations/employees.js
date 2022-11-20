import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z]{3,50}$/)
    .messages({
      'strig.required': 'Name is required',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must have at least 3 characters',
      'string.max': 'Name cannot exceed 20 characters',
      'string.pattern.base': 'Name can only have letters'
    }),
  lastName: Joi.string()
    .required()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z]{3,50}$/)
    .messages({
      'strig.required': 'Last Name is required',
      'string.empty': 'Last Name cannot be empty',
      'string.min': 'Last Name must have at least 3 characters',
      'string.max': 'Last Name cannot exceed 25 characters',
      'string.pattern.base': 'Last Name can only have letters'
    }),
  phone: Joi.number().required().min(8).max(10).messages({
    'number.required': ' Phone is required',
    'number.empty': 'Phone cannot be empty',
    'number.min': ' Phone must have at least 8 numbers',
    'number.max': ' Phone must cannot exceed 10 numbers'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email needs to be a valid address'
    }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .messages({
      'string.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must have at least 8 characters',
      'string.pattern.base': 'Password cannot contain special characters'
    })
});
