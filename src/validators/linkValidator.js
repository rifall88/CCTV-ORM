import Joi from "joi";

export const validateCreate = (req, res, next) => {
  const schema = Joi.object({
    link: Joi.string().required(),
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
    link: Joi.string().required(),
  });

  //digunakan untuk menampilkan semua pesan error sekaligus dalam bentuk array
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }
  next();
};
