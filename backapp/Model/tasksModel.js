const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "LasCosa",
  database: "api",
  connectionLimit: 5,
});

// const getUserId = async (email) => {
//     let conn;
//     try{
//         conn = await pool.getConnection()
//         const user = await conn.query("SELECT id, name, lastname FROM users WHERE email=?", [
//             email
//         ])
//         const user_id = user[0].id
//         if (user_id){
//             return {user_id}
//         } else {
//             return {message: "No se encontró el usuario"}
//         }
//     } catch (error){
//         console.log(error)
//     } finally{
//         if(conn) conn.release()
//     }
// }

const getTasks = async (email) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(
      "SELECT id, name, lastname FROM users WHERE email=?",
      [email]
    );
    const user_id = user[0].id;

    const tasks = await conn.query(
      "SELECT id, name, description, worker, completed FROM tasks WHERE user_id=?",
      [user_id]
    );
    if (tasks) {
      return { tasks, user };
    } else {
      return { message: "No hay tareas creadas para el usuario" };
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
};

const getTasksByName = async (email, name) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(
      "SELECT id, name, lastname FROM users WHERE email=?",
      [email]
    );
    const user_id = user[0].id;

    const tasks = await conn.query(
      "SELECT id, name, description, worker, completed FROM tasks WHERE user_id=? AND name=?",
      [user_id, name]
    );
    if (tasks) {
      return tasks;
    } else {
      return { message: "No se encontró la tarea" };
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
};

const updateTask = async (email, task) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const user = await conn.query(
      "SELECT id, name, lastname FROM users WHERE email=?",
      [email]
    );
    const user_id = user[0].id;

    const tasks = await conn.query(
      "UPDATE tasks SET name=?, description =?, worker=?, complete=? WHERE id=?",
      [task.name, task.description, task.worker, task.completed, user_id]
    );
    if (tasks) {
      return { tasks, user };
    } else {
      return { message: "No se encontró la tarea" };
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { getTasks, updateTask, getTasksByName };
