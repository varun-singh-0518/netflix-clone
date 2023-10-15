import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/netflix";

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
