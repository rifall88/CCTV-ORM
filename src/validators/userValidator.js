import Joi from "joi";

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    role: Joi.string().required().valid("admin", "user").default("user"),
    password: Joi.string().min(8).required().trim(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    password: Joi.string().min(8).required().trim(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }
  next();
};

export const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50),
    role: Joi.string().required().valid("admin", "user").default("user"),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }
  next();
};
