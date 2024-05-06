import { validateUserId, validateCreateUser } from "../schemas/user.schemas.js";

function validateId(req, res, next) {
  const { id } = req.params;
  const validationError = validateUserId(id);

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  next();
}

function validatePatch(req, res, next) {
  const payload = req.body;
  const validationError = validateCreateUser(payload);

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  next();
}

function validateCreate(req, res, next) {
  const payload = req.body;
  const validationError = validateCreateUser(payload);

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  next();
}

export default { validateId, validateCreate, validatePatch };
