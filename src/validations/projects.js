import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().trim().required().min(3).max(50).messages({
    'string.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least 3 characters',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  description: Joi.string().trim().required().min(3).max(150).messages({
    'string.required': 'Description is required',
    'string.empty': 'Description cannot be empty',
    'string.min': 'Name must have at least 3 characters',
    'string.max': 'Description cannot exceed 50 characters'
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date is required'
  }),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
    'date.base': 'End date is required',
    'date.greater': 'End cannot be greater than Start Date'
  }),
  clientName: Joi.string().trim().required().min(3).max(50).messages({
    'string.required': 'Client Name is required',
    'string.empty': 'Client Name cannot be empty',
    'string.min': 'Client Name must have at least 3 characters',
    'string.max': 'Client Name cannot exceed 50 characters'
  })
});
