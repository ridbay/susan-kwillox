const { validationResult } = require("express-validator");
module.exports = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({
      status: false,
      message: errors.errors[errors.errors.length - 1].msg,
    });
  } else next();
};
