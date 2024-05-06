import Joi from "joi";

function validateUserId(id) {
  const { error } = Joi.object({
    id: Joi.number().integer().required(),
  }).validate({ id });

  return error ? "ID must be an integer" : null;
}

function validateCreateUser(payload) {
  let errorMessages = null;
  const { error } = Joi.object({
    email: Joi.string().email().required().max(255),
    name: Joi.string().required().min(5).max(255),
  }).validate(payload, { abortEarly: false });

  if (error) {
    errorMessages = error.details.map((detail) => detail.message);
  }
  return errorMessages ?? null;
}

function validateUpdateUser(payload) {
  let errorMessages = null;
  const { error } = Joi.object({
    email: Joi.string().email().max(255),
    name: Joi.string().min(5).max(255).trim(),
  }).validate(payload, { abortEarly: false });

  if (error) {
    errorMessages = error.details.map((detail) => detail.message);
  }
  return errorMessages ?? null;
}

export { validateUserId, validateCreateUser, validateUpdateUser };
