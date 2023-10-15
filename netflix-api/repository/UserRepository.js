import mongoose from "mongoose";
import {userSchema} from "../models/UserModel.js";
import ApplicationError from "../error-handler/ApplicationError.js";

const UserModel = mongoose.model("users", userSchema);

export default class UserRepository {
  async addToLikedMovies(email, data) {
    try {
      const user = await UserModel.findOne({email});
      if (user) {
        const {likedMovies} = user;
        const movieAlreadyLiked = likedMovies.find(({id}) => id === data.id);
        console.log(movieAlreadyLiked);
        if (!movieAlreadyLiked) {
          await UserModel.findByIdAndUpdate(
            user._id,
            {
              likedMovies: [...user.likedMovies, data],
            },
            {
              new: true,
            }
          );
        }
      } else {
        const newUser = await UserModel.create({email, likedMovies: data});
        console.log(newUser);
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }

  async getLikedMovies(email) {
    try {
      const user = await UserModel.findOne({email});

      if (user) {
        return user.likedMovies;
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }

  async removeFromLikedMovies(email, movieID) {
    try {
      const user = await UserModel.findOne({email});
      if (user) {
        const {likedMovies} = user;
        const movieIndex = likedMovies.findIndex(({id}) => id === movieID);
        const deletedMovie = likedMovies.splice(movieIndex, 1);
        console.log(" deleted movie:", deletedMovie);

        const updatedMovies = await UserModel.findByIdAndUpdate(
          user._id,
          {
            likedMovies,
          },
          {
            new: true,
          }
        );

        console.log("updated movies:", likedMovies);
        return likedMovies;
      }
    } catch (err) {
      throw new ApplicationError("Something went wrong in database", 500);
    }
  }
}
