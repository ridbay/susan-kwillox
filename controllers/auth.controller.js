const UserModel = require("../models/User.model");
const bcryptJs = require("bcryptjs");
exports.createUser = async (request, response) => {
  //Destructure the Request Objects
  const { email, password, first_name, last_name, age, phone_number } =
    request.body;

  try {
    //Hash the password the user input
    const hashed_password = await bcryptJs.hash(password, 10);

    const data_to_save = { ...request.body, password: hashed_password };
    //Save the data to MongoDB through the Mongoose Model
    const create_user = await UserModel.create(data_to_save);
    //Return a response to the user after saving the data to the database
    response
      .status(201)
      .json({ data: create_user, status: "user crested successfully" });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const find_user = await UserModel.findOne({ email: email });
    if (find_user) {
      res
        .status(200)
        .json({ message: "user login successfully", data: find_user });
    } else {
      res.status(404).json({ message: "user not found", data: find_user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
