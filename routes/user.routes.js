const userController = require("../controllers/user.controller");
const { check, param, query } = require("express-validator");
const validateRequests = require("../middleware/validateRequests");
const validateAuthentication = require("../middleware/validateAuthentication");
const validateAdminRole = require("../middleware/validateAdminRole");
module.exports = function (app) {
  app.get(
    "/users",
    validateAuthentication,
    validateAdminRole,
    userController.getAllUsers
  );
  app.get(
    "/user",
    [
      query("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address"),
    ],
    validateRequests,
    validateAuthentication,
    validateAdminRole,
    userController.getOneUser
  );
};
