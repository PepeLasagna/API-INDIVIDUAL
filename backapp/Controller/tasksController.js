const taskModel = require("../Model/tasksModel");

const jwt = require("jsonwebtoken");

const secret = "ultra secret pass";

const getTasks = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const email = decoded.email;

  const tasks = await taskModel.getTasks(email);
  if (tasks) {
    res.json(tasks);
  } else {
    res.status(404).json({ message: "No se encontraron tareas." });
  }
};

const getTasksByName = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const email = decoded.email;
  const  { name } = req.query;

  const tasks = await taskModel.getTasksByName(email,  name );

  if (tasks) {
    res.json(tasks);
  } else {
    res.status(404).json({ message: "No se encontró tarea con ese nombre." });
  }
};

const updateTask = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const email = decoded.email;
  const taskBody = req.body;

  const task = await taskModel.putTask(email, taskBody);

  if (task) {
    res.json(task);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

module.exports = { getTasks, updateTask, getTasksByName };
