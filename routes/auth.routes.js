// const { authJwt } = require("../middleware");

const authController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/auth/register", authController.createUser);
  app.post("/auth/login", authController.loginUser);
};
