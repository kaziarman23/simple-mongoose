const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 6000;

// Importing Routers
const homeRoute = require("./routers/home.route");

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/", homeRoute);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
