const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const PORT = 1000;
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// pricelessblinks;

// kWvli4UJegEZRVZq;
// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

app.get("/", (request, response) => {
  return response.send("Kwillox server is running");
});
require("./routes/auth.routes")(app);
// app.post("/register", async (request, response) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   try {
//     await user.save();
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }

//   return response.status(201).json({
//     message: "Registeration successful",
//     data: request.body,
//   });
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// module.exports = app;
