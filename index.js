const express = require("express");
const app = express();

app
  .get("/", (req, res) => {
    return res.status(200).json("Local get");
  })
  .post("/register", (req, res) => {
    res.status(200).json("Local post register");
  });

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port  ${port}`);
});
