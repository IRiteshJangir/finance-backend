const Joi = require('joi');

exports.recordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  date: Joi.date().optional(),
  notes: Joi.string().allow('')
});