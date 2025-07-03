import Joi from "joi";

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50).messages({
      "string.base": "Nama harus string.",
      "string.empty": "Nama pengguna tidak boleh kosong",
      "string.min":
        "Nama pengguna harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Nama pengguna tidak boleh melebihi {#limit} karakter",
      "any.required": "Nama Pengguna Harus Di Isi",
    }),
    role: Joi.string().valid("admin", "user").default("user"),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password harus string.",
      "string.min": "Password harus memiliki setidaknya {#limit} karakter.",
      "string.empty": "Password tidak boleh kosong.",
      "any.required": "Password wajib diisi.",
    }),
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
    username: Joi.string().required().min(3).max(50).messages({
      "string.base": "Nama harus string.",
      "string.empty": "Nama pengguna tidak boleh kosong",
      "string.min":
        "Nama pengguna harus memiliki setidaknya {#limit} karakter.",
      "string.max": "Nama pengguna tidak boleh melebihi {#limit} karakter",
      "any.required": "Nama Pengguna Harus Di Isi",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password harus string.",
      "string.min": "Password harus memiliki setidaknya {#limit} karakter.",
      "string.empty": "Password tidak boleh kosong.",
      "any.required": "Password wajib diisi.",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
