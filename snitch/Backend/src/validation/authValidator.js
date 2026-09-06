import { body, validationResult } from "express-validator";

const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

const validate = [
  body("fullname")
    .notEmpty()
    .withMessage("fullname is required")
    .isLength({ min: 3 })
    .withMessage("fullname must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),

  body("contact")
    .notEmpty()
    .withMessage("contact is required")
    .isLength({ min: 10 })
    .withMessage("contact must be at least 10 characters"),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

  body("role")
    .notEmpty()
    .withMessage("role is required"),

  validator,
];

export default validate;