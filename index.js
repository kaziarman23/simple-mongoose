const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@knight-cluster.bypaq.mongodb.net/?retryWrites=true&w=majority&appName=knight-cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Routers
app.use("/", homeRoute);

app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
