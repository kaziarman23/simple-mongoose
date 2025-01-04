const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 6000;

// Importing Routers
const homeRoute = require("./src/Routers/home.route");
const todoRouter = require("./src/Routers/todo.route");

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@knight-cluster.bypaq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=knight-cluster`
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Routers
app.use("/", homeRoute);

app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
