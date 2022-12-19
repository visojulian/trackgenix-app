import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .pattern(/^[a-zA-Z\s]*$/)
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
    .trim()
    .pattern(/^[a-zA-Z\s]*$/)
    .messages({
      'strig.required': 'Last Name is required',
      'string.empty': 'Last Name cannot be empty',
      'string.min': 'Last Name must have at least 3 characters',
      'string.max': 'Last Name cannot exceed 25 characters',
      'string.pattern.base': 'Last Name can only have letters'
    }),
  phone: Joi.string()
    .required()
    .length(10)
    .trim()
    .pattern(/^[0-9]*$/)
    .messages({
      'string.required': 'Phone is required',
      'string.empty': 'Phone cannot be empty',
      'string.length': ' Phone must have 10 digits',
      'string.pattern.base': 'Phone can only have numbers'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .messages({
      'string.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email needs to be a valid address'
    }),
  repeatEmail: Joi.any().valid(Joi.ref('email')).required().messages({
    'any.only': 'Emails must match'
  }),
  password: Joi.string()
    .required()
    .min(8)
    .trim()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .messages({
      'string.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must have at least 8 characters',
      'string.pattern.base': 'Password cannot contain special characters'
    }),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match'
  })
});

export const editSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(20)
    .trim()
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
    .trim()
    .pattern(/^[a-zA-Z]{3,50}$/)
    .messages({
      'strig.required': 'Last Name is required',
      'string.empty': 'Last Name cannot be empty',
      'string.min': 'Last Name must have at least 3 characters',
      'string.max': 'Last Name cannot exceed 25 characters',
      'string.pattern.base': 'Last Name can only have letters'
    }),
  phone: Joi.string()
    .required()
    .length(10)
    .pattern(/^[0-9]*$/)
    .messages({
      'string.required': 'Phone is required',
      'string.empty': 'Phone cannot be empty',
      'string.length': 'Phone must have 10 digits',
      'string.pattern.base': 'Phone can only have numbers'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .messages({
      'string.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email needs to be a valid address'
    }),
  repeatEmail: Joi.any().valid(Joi.ref('email')).required().messages({
    'any.only': 'Emails must match'
  })
});
