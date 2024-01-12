// Imports environment variables from the env.js file.
//This is a common practice for handling sensitive information like API keys or database connection strings.
import "./env.js";
import express from "express";
import cors from "cors";
import {connectUsingMongoose} from "./confiq/mongoose.js";
import userRouter from "./routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json()); //This allows the application to handle JSON data in request bodies.

app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
  connectUsingMongoose();
  console.log("server started");
});
