import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().trim().min(3).max(150).required().messages({
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must have at least 3 characters',
    'string.max': 'Description cannot exceed 150 characters',
    'string.required': 'Description is required'
  }),
  date: Joi.date().iso().required().messages({
    'date.empty': 'Date cannot be empty',
    'date.iso': 'Date must be a valid format',
    'date.required': 'Date is required'
  }),
  hours: Joi.number().positive().required().messages({
    'number.empty': 'Hours cannot be empty',
    'number.positive': 'Hours must be positive',
    'number.required': 'Hours  is required'
  }),
  task: Joi.string().length(24).required().messages({
    'string.empty': 'Task cannot be empty',
    'string.legth': 'Task does not exist',
    'string.required': 'Task is required'
  }),
  employee: Joi.string().length(24).required().messages({
    'string.empty': 'Employee cannot be empty',
    'string.legth': 'Employee does not exist',
    'string.required': 'Employee is required'
  }),
  project: Joi.string().length(24).required().messages({
    'string.empty': 'Project cannot be empty',
    'string.legth': 'Project does not exist',
    'string.required': 'Project is required'
  })
});
