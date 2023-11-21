import UserRepository from "../repository/UserRepository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async addToLikedMovies(req, res) {
    try {
      const {email, data} = req.body;
      await this.userRepository.addToLikedMovies(email, data);
      res.status(200).send("Movie added sucessfully");
    } catch (err) {
      console.log(err);
      return res.send("Something went wrong");
    }
  }

  async getLikedMovies(req, res) {
    try {
      const {email} = req.body;
      const user = await this.userRepository.getLikedMovies(email);
      console.log(user);
      res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return res.send("Something went wrong");
    }
  }

  async removeFromLikedMovies(req, res) {
    try {
      const {email, movieID} = req.body;
      const updatedmovies = await this.userRepository.removeFromLikedMovies(
        email,
        movieID
      );
      res.status(200).send(updatedmovies);
    } catch (err) {
      console.log(err);
      return res.send("Something went wrong");
    }
  }
}
