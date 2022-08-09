import express from "express";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// import { DB_URL } from "./config.js";

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Failed to connect to db:", error.name);
  });

const app = express();
const port = 8081;

app.use(express.json());
// convert what you are sending to json format
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to Inventory");
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
