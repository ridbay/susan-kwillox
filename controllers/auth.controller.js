const UserModel = require("../models/User.model");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv");
exports.createUser = async (request, response) => {
  //Destructure the Request Objects
  const { email, password, first_name, last_name, age, phone_number, role } =
    request.body;

  try {
    //Check if the user email already exist
    const user = await UserModel.findOne({ email });
    if (user) {
      response
        .status(400)
        .json({ data: null, message: "User already exist, please login" });
    } else {
      //Hash the password the user input
      const hashed_password = await bcryptJs.hash(password, 10);

      const data_to_save = { ...request.body, password: hashed_password };
      //Save the data to MongoDB through the Mongoose Model
      const create_user = await UserModel.create(data_to_save);
      //Return a response to the user after saving the data to the database
      response
        .status(201)
        .json({ data: create_user, message: "user created successfully" });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (request, response) => {
  try {
    const email = request.body.email;
    const user_password = request.body.password;
    //Check if the user exist
    const find_user = await UserModel.findOne({ email: email });

    if (find_user) {
      const { first_name, last_name, phone_number, age, password, role } =
        find_user;
      //Check if the password matches
      const password_matches = await bcryptJs.compare(user_password, password);
      if (password_matches) {
        const timestamp = Math.floor(Date.now() / 1000);
        // console.log(timestamp);
        let token = jwt.sign(
          {
            email: email,
            first_name,
            last_name,
            age,
            phone_number,
            role,
            iat: timestamp,
          },
          process.env.SECRET_KEY,
          {
            algorithm: "HS512",
            expiresIn: "1h",
          }
        );
        response.status(200).json({
          message: "user login successfully",
          data: {
            token,
          },
        });
      } else {
        response
          .status(400)
          .json({ message: "Login details incorrect", data: null });
      }
    } else {
      response.status(404).json({ message: "user not found", data: null });
    }

    //Generate a authentication token for all request
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.inbox = async (request, response) => {
  try {
    const { first_name, last_name, age, phone_number } = request.user;
    response.status(200).json({
      message: `Welcome ${first_name}, you are ${age} years old, your phone number is ${phone_number}`,
      data: null,
    });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
