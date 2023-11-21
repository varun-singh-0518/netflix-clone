import express from "express";
import UserController from "../controllers/UserController.js";

//Creates an instance of an Express router
const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/add", (req, res) => {
  userController.addToLikedMovies(req, res);
});

userRouter.post("/liked", (req, res) => {
  userController.getLikedMovies(req, res);
});

userRouter.put("/delete", (req, res) => {
  userController.removeFromLikedMovies(req, res);
});

export default userRouter;
