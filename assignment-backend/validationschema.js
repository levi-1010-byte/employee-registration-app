const Joi = require('joi');

// Validation schema for creating a new employee
const createEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  start_date: Joi.date().iso().required(),
});

// Validation schema for updating an employee
const updateEmployeeSchema = Joi.object({
  name: Joi.string(),
  department: Joi.string(),
  email: Joi.string().email(),
  position: Joi.string(),
  start_date: Joi.date().iso(),
});
module.exports= {updateEmployeeSchema,createEmployeeSchema};