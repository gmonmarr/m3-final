const { body } = require("express-validator");

const validateRegister = [
  body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
  body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
];

const validateLogin = [
  body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

module.exports = {
  validateRegister,
  validateLogin
};
