import Joi from 'joi';

export const schema = Joi.object({
  description: Joi.string().trim().min(3).max(150).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must have at least 3 characters',
    'string.max': 'Description cannot exceed 150 characters'
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'Date is required',
    'date.format': 'Date must be a valid format'
  }),
  hours: Joi.number().positive().required().messages({
    'number.base': 'Hours  is required',
    'number.positive': 'Hours must be positive'
  }),
  task: Joi.string().length(24).required().messages({
    'string.empty': 'Task is required',
    'string.legth': 'Task does not exist'
  }),
  employee: Joi.string().length(24).required().messages({
    'string.empty': 'Employee is required',
    'string.legth': 'Employee does not exist'
  }),
  project: Joi.string().length(24).required().messages({
    'string.empty': 'Project is required',
    'string.legth': 'Project does not exist'
  })
});
