import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;

    console.log("CONNECTED TO MONGO DB");
  } catch (err) {
    console.log(err);
  }
};
