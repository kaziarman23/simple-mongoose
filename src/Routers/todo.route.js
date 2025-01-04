const express = require("express");
const route = express.Router();
const Todo = require("../Schema/todoSchema");

route.get("/", (req, res) => {
    
});

route.get("/:id", (req, res) => {});

route.post("/", (req, res) => {});

route.put("/:id", (req, res) => {});

route.delete("/:id", (req, res) => {});

module.exports = route;
