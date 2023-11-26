const userModel = require("../Model/userModel");

const signup = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ error: "Complete todos los datos" });
  }

  try {
    const result = await userModel.signup({ name, lastname, email, password });
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "El usuario ya está registrado") {
      res.status(400).json({ error: "El usuario ya está registrado" });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { signup, login };
