import Joi from 'joi';

export const CreateUserSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required().max(200).min(5),
  age: Joi.number().required().greater(18),
  description: Joi.string().optional().max(200).min(5).allow(null),
  address: Joi.string().optional().max(200).min(5).allow(null),
}).options({ abortEarly: false });

export const UpdateUserSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().optional().max(200).min(5),
  age: Joi.number().optional().greater(18),
  description: Joi.string().optional().max(200).min(5).allow(null),
  address: Joi.string().optional().max(200).min(5).allow(null),
}).options({ abortEarly: false });

export const LoginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
