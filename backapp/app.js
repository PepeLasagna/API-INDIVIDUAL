const express = require("express");

const secret = "ultra secret pass";

const app = express();

const cors = require("cors");

const jwt = require("jsonwebtoken");

const port = process.env.PORT ?? 3000;

const userRouter = require("../backapp/Routes/userRoutes");

const bodyParser = require("body-parser");

const taskRouter = require("../backapp/Routes/tasksRoutes");

app.use(cors());

app.use(bodyParser.json());

app.use("/tasks", (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401).json({ error: "No autorizado" });
  }
});

app.use("/users", userRouter);

app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
