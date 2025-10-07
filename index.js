const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app
  .get("/", (req, res) => {
    return res.status(200).json("Local get");
  })
  .post("/register", (req, res) => {
    res.status(200).json(req.body);
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port  ${port}`);
});
