const express = require("express");
const route = express.Router();
const User = require("../Schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.get("/", async (req, res) => {
  const result = await User.find();
  res.status(200).send(result);
});

// signin route
route.post("/signin", async (req, res) => {
  // checking that user is an old user or not
  const query = { email: req.body.email };
  const oldUser = await User.findOne(query);
  if (oldUser) {
    return res.status(409).json({
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

//login route
route.post("/login", async (req, res) => {
  const query = { email: req.body.email };
  const user = await User.find(query);

  console.log("user:", user);
  if (user) {
    // vaildating the user password
    const isvalidpassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );

    // giving a access token to the user
    console.log("isvalidpassword:", isvalidpassword);
    if (isvalidpassword) {
      const token = jwt.sign(
        {
          user: user[0].user,
          userId: user[0]._id,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1h",
        }
      );

      // sending success message
      res.status(200).json({
        message: "Login Successfull",
        Access_Token: token,
      });
    } else {
      res.status(401).json({
        error: "Authintication Failed !",
      });
    }
  } else {
    res.status(401).json({
      error: "Authintication Failed !",
    });
  }
});

// delete route
route.delete("/deleteAll", async (req, res) => {
  await User.deleteMany();

  res.status(200).json({
    message: "All users were deleted successfully.",
  });
});

module.exports = route;
