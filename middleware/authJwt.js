/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
// const Sentry = require("../services/sentry")
module.exports = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    // console.log(authHeader)
    if (!authHeader) {
      return response.status(401).json({
        status: false,
        message: 'Authorization is required',
      });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      process.env.KEY,
      { algorithms: ['HS512'] },
      (err, user) => {
        if (err) {
          return response.status(401).json({
            status: false,
            message: 'Invalid authentication token',
          });
        }
        request.mail = user.mail;
        request.xid = user.xid;
        request.avi = user.avi;
        request.name = user.name;
        request.device = user.device;
        request.platform = user.entry;
        request.deviceName = user.deviceName;
        request.deviceType = user.deviceType;
        request.deviceid = user.deviceid;

        request.country = user.country;
        request.phone_number = user.phone_number;
        next();
      },
    );
  } catch (error) {
    // Sentry.captureException(error);
    return response.status(500).json({
      status: false,
      message: 'Problems authorising',
    });
  }
};
