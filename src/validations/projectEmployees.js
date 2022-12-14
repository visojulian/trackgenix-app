import Joi from 'joi';

export const schema = Joi.object({
  employee: Joi.string().trim().length(24).required().messages({
    'string.required': 'Employee is required',
    'string.empty': 'Employee cannot be empty',
    'string.length': 'The ID of this employee is not valid.'
  }),
  role: Joi.any().required().messages({
    'any.required': 'Employee role is required',
    'any.empty': 'Employee role cannot be empty'
  }),
  rate: Joi.string()
    .required()
    .trim()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.required': ' Rate is required',
      'string.empty': 'Rate cannot be empty',
      'string.pattern.base': ' Rate can only have numbers'
    })
});
