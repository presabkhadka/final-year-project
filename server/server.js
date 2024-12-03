const express = require("express");
const port = 1010;

const app = express();

app.get("/", (req, res) => {
  res.send("hi there, welcome to the server!");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
