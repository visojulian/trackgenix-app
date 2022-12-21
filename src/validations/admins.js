import Joi from 'joi';

const name = Joi.string()
  .min(3)
  .max(20)
  .pattern(/^[a-zA-Z\s]*$/)
  .trim()
  .required()
  .messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 3 characters',
    'string.max': 'Name cannot exceed 20 characters',
    'string.pattern.base': 'Name can only have letters',
    'string.required': 'Name is required'
  });
const lastName = Joi.string()
  .min(3)
  .max(25)
  .pattern(/^[a-zA-Z\s]*$/)
  .trim()
  .required()
  .messages({
    'string.empty': 'Last Name cannot be empty',
    'string.min': 'Last Name must have at least 3 characters',
    'string.max': 'Last Name cannot exceed 25 characters',
    'string.pattern.base': 'Last Name can only have letters',
    'string.required': 'Last Name is required'
  });
const email = Joi.string()
  .email({ tlds: { allow: false } })
  .trim()
  .required()
  .messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email needs to be a valid email address',
    'string.required': 'Email is required'
  });
const repeatEmail = Joi.any().valid(Joi.ref('email')).required().messages({
  'any.only': 'Emails must match'
});

export const schema = Joi.object({
  name,
  lastName,
  email,
  repeatEmail,
  password: Joi.string().min(8).alphanum().trim().required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must have at least 8 characters',
    'string.alphanum': 'Password cannot contain special characters',
    'string.required': 'Password is required'
  }),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match'
  })
});

export const editSchema = Joi.object({
  name,
  lastName,
  email,
  repeatEmail
});
