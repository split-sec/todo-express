import pool from "../database.js";

export const updateTimeElapsed = async () => {
  const result = await pool.query(`
    UPDATE TODOS 
    SET TIME_LAPSED = 1
    WHERE
    DAY(CREATED_AT) - DAY(NOW()) >= 0
  `);

  console.log("result", result);
}