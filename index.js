const express = require("express");

const app = express();
const PORT = 1000;

// ENDPOINT

app.get("/", (request, response) => {
  return response.send("Kwillox server is running");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
