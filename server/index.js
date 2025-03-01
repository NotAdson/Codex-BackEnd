import dotenv from "dotenv";
import connectDB from "./src/database/connection.js";
import { User } from "./src/models/User.js";

dotenv.config();

connectDB();

const createUser = async () => {
  try {
    const newUser = new User({
      name: "Carinha legal",
      email: "email@example.com",
      password: "hashedPassword:D",
    });

    await newUser.save();
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

createUser();
