const express = require("express");

const tasksController = require("../Controller/tasksController");

const tasksRouter = express.Router();

tasksRouter.get("/", tasksController.getTasks);

tasksRouter.put("/", tasksController.updateTask);

tasksRouter.get("/byname", tasksController.getTasksByName);

module.exports = tasksRouter;
