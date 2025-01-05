const express = require("express");
const route = express.Router();
const User = require("../Schema/userSchema");



route.post("/signIn", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        user: req.body.user,
        // password: 
    })
});

module.exports = route;
