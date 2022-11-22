import Joi from 'joi';

// const employeeSchema = Joi.object({
//   employee: Joi.string().length(24).required().messages({
//     'string.required': 'Employee is required',
//     'string.empty': 'Employee cannot be empty',
//     'string.length': 'The ID of this employee is not valid.'
//   }),
//   role: Joi.any().required().messages({
//     'any.required': 'Employee role is required',
//     'any.empty': 'Employee role cannot be empty'
//   }),
//   rate: Joi.number().required().positive().messages({
//     'number.required': 'Employee rate is required',
//     'number.empty': 'Employee rate cannot be empty',
//     'number.positive': 'Employee rate should be a positive number'
//   })
// });

export const schema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    'string.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 3 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  description: Joi.string().required().min(3).max(150).messages({
    'string.required': 'Description is required',
    'string.empty': 'Description cannot be empty',
    'string.min': 'Name must have at least 3 characters',
    'string.max': 'Description cannot exceed 50 characters'
  }),
  startDate: Joi.date().required().messages({
    'date.required': 'Start Date is required',
    'date.empty': 'Start Date cannot be empty'
  }),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
    'date.required': 'End Date is required',
    'date.empty': 'End Date cannot be empty'
  }),
  clientName: Joi.string().required().min(3).max(50).messages({
    'string.required': 'Client Name is required',
    'string.empty': 'Client Name cannot be empty',
    'string.min': 'Client Name must have at least 3 characters',
    'string.max': 'Client Name cannot exceed 50 characters'
  }),
  employee: Joi.string().length(24).required().messages({
    'string.required': 'Employee is required',
    'string.empty': 'Employee cannot be empty',
    'string.length': 'The ID of this employee is not valid.'
  }),
  role: Joi.any().required().messages({
    'any.required': 'Employee role is required',
    'any.empty': 'Employee role cannot be empty'
  }),
  rate: Joi.number().required().positive().messages({
    'number.required': 'Employee rate is required',
    'number.empty': 'Employee rate cannot be empty',
    'number.positive': 'Employee rate should be a positive number'
  })
});
