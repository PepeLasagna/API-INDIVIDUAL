const mariadb = require("mariadb");

const jwt = require("jsonwebtoken");

const secret = "ultra secret pass";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "LasCosa",
  database: "api",
  connectionLimit: 5,
});

const signup = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO users(name, lastname, email, password) VALUES (?, ?, ?, ?)`,
      [user.name, user.lastname, user.email, user.password]
    );
    return { id: parseInt(result.insertId), ...user };
  } catch (error) {
    console.log(error.message);
  } finally {
    if (conn) conn.release();
  }
};

const login = async (user) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "SELECT email, password FROM users WHERE email = ? AND password = ?",
      [user.email, user.password]
    );
    if (result.length === 0) {
      return { message: "Credenciales incorrectas" };
    } else {
      const email = user.email;
      const token = jwt.sign({ email }, secret);
      return { token, email };
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { signup, login };
