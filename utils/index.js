import jwt from "jsonwebtoken";
import cron from "node-cron";
import { updateTimeElapsed } from "../controllers/cron.js";

export const generateJWT = async (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

export const cronJob = async () => {
  cron.schedule("* * * * *", () => {
    updateTimeElapsed();
  })
}