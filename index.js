const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const itemRoutes = require("./routes/item.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const app = express();
const PORT = 1000;
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

app.get("/", (request, response) => {
  return response.send("Kwillox server is running");
});
authRoutes(app);
itemRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
