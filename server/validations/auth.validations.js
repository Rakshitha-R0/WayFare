import Joi from "joi";

const registerSchema = Joi.alternatives().try(
	Joi.object({
		username: Joi.string().min(4).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().min(6).required(),
	}),
	Joi.object({
		username: Joi.string().min(4).required(),
		email: Joi.string().email().required(),
		googleId: Joi.string().required(),
	})
);

const loginSchema = Joi.alternatives().try(
	Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
	Joi.object({
		email: Joi.string().email().required(),
		googleId: Joi.string().required(),
	})
);

export { registerSchema, loginSchema };