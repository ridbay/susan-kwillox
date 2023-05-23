const itemController = require("../controllers/item.controller");
const { check, param, query } = require("express-validator");
const validateRequests = require("../middleware/validateRequests");
const validateAuthentication = require("../middleware/validateAuthentication");
const validateAdminRole = require("../middleware/validateAdminRole");
module.exports = function (app) {
  app.post(
    "/item",
    [
      check("name")
        .isAlphanumeric()
        .withMessage("Item Name can only be alphanumeric"),

      check("description")
        .isString()
        .withMessage("Description can only be string"),
      check("price").isNumeric().withMessage("Price can only numeric"),
      check("isAvailable")
        .isBoolean()
        .withMessage("Available should be boolean"),
    ],
    validateRequests,
    validateAuthentication,
    validateAdminRole,
    itemController.createItem
  );
  app.get("/item", validateAuthentication, itemController.getAllItems);
};
