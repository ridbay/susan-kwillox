const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        status: false,
        message: "You are not logged in",
      });
    } else {
      const token = authHeader.split(" ")[1];

      const isVerifiedToken = await jwt.verify(token, process.env.SECRET_KEY, {
        algorithms: ["HS512"],
      });
      if (isVerifiedToken) {
        request.user = isVerifiedToken;
        next();
      } else {
        return response.status(401).json({
          status: false,
          message: "Invalid authentication token",
        });
      }
    }
  } catch (error) {
    // Sentry.captureException(error);
    return response.status(500).json({
      status: false,
      message: "Unable to authenticate token",
      error,
    });
  }
};
