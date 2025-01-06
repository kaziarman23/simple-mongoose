const express = require("express");
const route = express.Router();
const User = require("../Schema/userSchema");
const bcrypt = require("bcrypt");

route.get("/", async (req, res) => {
  const result = await User.find();
  res.status(200).send(result);
});

route.post("/signIn", async (req, res) => {
  // checking that user is an old user or not
  const query = { email: req.body.email };
  const oldUser = await User.findOne(query);
  if (oldUser) {
    res.status(409).json({
      message: "This user is already exist in the database",
    });
  }

  // encripting the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // creating a new user
  const newUser = new User({
    user: req.body.user,
    email: req.body.email,
    password: hashedPassword,
    status: req.body.status,
  });

  // saving the user
  await newUser.save();

  // sending a success response in the browser
  res.status(200).json({
    message: "New user created successfully",
  });
});

module.exports = route;
