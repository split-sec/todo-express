import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import pool from "../database.js";
import { generateJWT } from "../utils/index.js";

export const doesUserAlreadyExist = async (email_id) => {
  const [rows] = await pool.query(`
    SELECT * FROM USERS WHERE EMAIL_ID=?
  `, [email_id]);

  return rows.length > 0;
}

export const createUser = async ({ name, email_id, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(`
    INSERT INTO USERS (NAME, EMAIL_ID, PASSWORD)
    VALUES (?, ?, ?);
  `, [name, email_id, hashedPassword]);
  console.log("Created user", result[0].insertId);

  const userID = result[0].insertId;

  const JWT = generateJWT(userID);
  
  return JWT;
}

export const signinController = async ({ email_id, password }) => {
  const [rows] = await pool.query(`
    SELECT ID, PASSWORD FROM USERS WHERE EMAIL_ID=?
  `, [email_id]);
  console.log("rows", rows, email_id);

  if (rows.length <= 0) {
    return false;
  }

  const { PASSWORD, ID } = rows[0];

  const arePasswordsMatching = await bcrypt.compare(password, PASSWORD);

  return { arePasswordsMatching, id: ID};
}