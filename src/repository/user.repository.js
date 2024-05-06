import { pool } from "../db.js";

async function getUsers() {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserById(id) {
  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id=${id}`);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUserById(id) {
  try {
    const { rows, rowCount } = await pool.query(
      `DELETE FROM users WHERE id=${id} RETURNING *`
    );

    return { rows, rowCount };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUser(payload) {
  const { email, name } = payload;

  const query = {
    text: "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name",
    values: [email, name],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  }
}

async function patchUserById(id, payload) {
  const { name, email } = payload;

  const query = {
    text: `
          UPDATE users
          SET
            email = $1,
            name = $2
          WHERE
            id = $3
          RETURNING id, email, name;
        `,
    values: [email, name, id],
  };
  try {
    const { rows, rowCount } = await pool.query(query);
    return { rows, rowCount };
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  patchUserById,
};
