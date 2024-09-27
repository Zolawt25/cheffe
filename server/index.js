require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connectDb");
const cors = require("cors");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/blogs", blogRouter);
app.use("/users", userRouter);

const port = 5000;

app.get("/", (req, res) => res.send("Hello World!"));

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server started on ${port}..`);
  });
};

start();
