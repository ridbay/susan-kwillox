const authController = require("../controllers/auth.controller");
const { check, param, query } = require("express-validator");
const validateRequests = require("../middleware/validateRequests");
const validateAuthentication = require("../middleware/validateAuthentication");
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
        .withMessage("First Name can only be alphabets")
        .isLength({ min: 2 })
        .withMessage("First Minimum of 2 characters"),
      check("last_name")
        .notEmpty()
        .withMessage("Last Name is required")
        .isAlpha()
        .withMessage("Last Name can only be alphabets"),
      check("phone_number")
        .notEmpty()
        .withMessage("Phone Number is required")
        .isNumeric()
        .withMessage("Phone Number can only numeric")
        .isLength({ min: 10, max: 11 })
        .withMessage(
          "Phone Number must be minimum of 10 characters and maximum of 11"
        ),
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
          minSymbols: 1,
        })
        .withMessage(
          "Password must be minimum of 2 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol"
        ),
      check("role")
        .isIn(["admin", "user"])
        .withMessage("Role must either be admin or user"),
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
          minSymbols: 1,
        })
        .withMessage(
          "Password must be minimum of 2 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol"
        ),
    ],
    validateRequests,
    authController.loginUser
  );
  app.get("/inbox", validateAuthentication, authController.inbox);
};
