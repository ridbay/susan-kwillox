const ItemModel = require("../models/Item.model");

exports.createItem = async (request, response) => {
  //Destructure the Request Objects
  const { name, description, price, isAvailable } = request.body;

  try {
    const data_to_save = { name, description, price, isAvailable };
    //Save the data to MongoDB through the Mongoose Model
    const create_item = await ItemModel.create(data_to_save);
    //Return a response to the user after saving the data to the database
    response
      .status(201)
      .json({ data: create_item, message: "Item created successfully" });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

exports.getAllItems = async (request, response) => {
  try {
    const allItems = await ItemModel.find();

    if (allItems) {
      response.status(200).json({
        message: "All items fetched",
        data: {
          allItems,
        },
      });
    } else {
      response.status(404).json({ message: "No item was found", data: null });
    }
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
