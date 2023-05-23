const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
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
require("./routes/auth.routes")(app);
require("./routes/item.routes")(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
