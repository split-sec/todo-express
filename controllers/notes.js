import pool from "../database.js";

export const getNotes = async (userID) => {
  const [ rows ] = await pool.query(`
    SELECT * FROM TODOS WHERE USER_ID=?
  `, [userID]);

  return rows;
};

export const getNoteById = async (userID) => {
  const [ rows ] = await pool.query(`
    SELECT * FROM TODOS WHERE USER_ID = ?
  `, [userID]);

  return rows[0];
};

export const createNote = async (userID, title, content) => {
  const result = await pool.query(`
    INSERT INTO TODOS (TITLE, CONTENT, USER_ID, CREATED_AT, UPDATED_AT)
    VALUES (?, ?, ?, NOW(), NOW());
  `, [title, content, userID]);

  return result.length > 0;
};