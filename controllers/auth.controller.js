const UserModel = require("../models/User.model");

exports.createUser = async (req, res) => {
  try {
    const create_user = await UserModel.create(req.body);

    console.log(create_user);
    res.json({ data: req.body, status: "user crested successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
