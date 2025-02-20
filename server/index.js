const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
// middlewares

// mongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dubrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Connect To MongoDB --->
const client = new MongoClient(uri, {
  tls: true,
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
});

async function run() {
  try {
    // All DB & Collections --->
    const db = client.db("task_todo_DB");
    const usersCollection = db.collection("users");

    // <----- All CRUD FUNCTIONALITY ----->

    // Save user data in db -->
    app.post("/users", async (req, res) => {
      const user = req.body;
      // check if user is already exists--->
      const isExist = await usersCollection.findOne({ email: user.email });
      if (isExist) {
        return res.send(isExist);
      }
      // if new user save data in db --->
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // <----- All CRUD FUNCTIONALITY ----->

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log("error caught -->", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("task-to-do server is running");
});

app.listen(port, () => {
  console.log(`task-to-do server is running on PORT:${port}`);
});
