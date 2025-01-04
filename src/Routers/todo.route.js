const express = require("express");
const route = express.Router();
const Todo = require("../Schema/todoSchema");

route.get("/", async (req, res) => {
  const result = await Todo.find();
  res.status(200).send(result);
});

route.get("/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await Todo.findOne(filter);
  res.status(200).json({ message: "Todo is found.", user: result });
});

route.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.status(200).json({
    message: "Todo was inserted successfullly.",
  });
  // have to use try/catch method for handling error
});

route.post("/postMany", async (req, res) => {
  await Todo.insertMany(req.body);
  res.status(200).json({
    message: "Todos were inserted successfullly.",
  });
  // have to use try/catch method for handling error
});

route.put("/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const updatedDoc = {
    $set: {
      status: "active",
    },
  };

  // updating on data
  await Todo.updateOne(filter, updatedDoc);

  res.status(200).json({
    message: "Todo is updated to active.",
  });
  // have to use try/catch method for handling error
});

route.delete("/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  // deleting a data
  await Todo.deleteOne(filter);

  res.status(200).json({
    message: "Todo was deleted successfully.",
  });
  // have to use try/catch method for handling error
});

route.delete("/deleteAll", async (req, res) => {
  await Todo.deleteMany();

  res.status(200).json({
    message: "All todos were deleted successfully.",
    deletedCount: result.deletedCount,
  });
});

module.exports = route;
