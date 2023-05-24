const UserModel = require("../models/User.model");

exports.getAllUsers = async (request, response) => {
  try {
    const allUsers = await UserModel.find();
    const mappedUsers = allUsers.map((obj) => {
      return {
        id: obj._id,
        email: obj.email,
        first_name: obj.first_name,
        last_name: obj.last_name,
        phone_number: obj.phone_number,
        age: obj.age,
        role: obj.role,
      };
    });

    if (mappedUsers.length > 0) {
      response.status(200).json({
        message: "All users fetched",
        data: mappedUsers,
      });
    } else {
      response.status(404).json({ message: "No user was found", data: null });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.getOneUser = async (request, response) => {
  const email = request.query.email;
  try {
    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      const userData = {
        id: findUser._id,
        email: findUser.email,
        first_name: findUser.first_name,
        last_name: findUser.last_name,
        phone_number: findUser.phone_number,
        age: findUser.age,
        role: findUser.role,
      };
      response.status(200).json({
        message: `User with email ${email} found `,
        data: userData,
      });
    } else {
      response
        .status(404)
        .json({ message: `No user with email ${email} found  `, data: null });
    }
  } catch (err) {
    response
      .status(404)
      .json({ message: `No user with id ${id} found  `, data: null });
  }
};
