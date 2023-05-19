const authController = require("../controllers/auth.controller");
const { check, param, query } = require("express-validator");
const validateRequests = require("../middleware/validateRequests");
module.exports = function (app) {
  app.post(
    "/auth/register",
    [
      check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),
      check("first_name")
        .notEmpty()
        .withMessage("First Name is required")
        .isAlpha()
        .withMessage("First Name can only be alphabets"),
      check("last_name")
        .notEmpty()
        .withMessage("Last Name is required")
        .isAlpha()
        .withMessage("Last Name can only be alphabets"),
      check("phone_number")
        .notEmpty()
        .withMessage("Phone Number is required")
        .isNumeric()
        .withMessage("Phone Number can only numeric"),
      check("age")
        .notEmpty()
        .withMessage("Age is required")
        .isNumeric()
        .withMessage("Age can only numeric"),
      check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isStrongPassword({
          minLength: 2,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 2,
        })
        .withMessage(
          "Password must be minimum of 2 characters, 1 lowercase, 1 uppercase, 1 number and 2 symbols"
        ),
    ],
    validateRequests,
    authController.createUser
  );
  app.post(
    "/auth/login",
    [
      check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),
      check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isStrongPassword({
          minLength: 2,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 2,
        })
        .withMessage(
          "Password must be minimum of 2 characters, 1 lowercase, 1 uppercase, 1 number and 2 symbols"
        ),
    ],
    validateRequests,
    authController.loginUser
  );
};
