import express from "express";
import cors from "cors";
import {connectUsingMongoose} from "./confiq/mongoose.js";
import userRouter from "./routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(5000, () => {
  connectUsingMongoose();
  console.log("server started");
});
