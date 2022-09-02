const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    users.create({
      username: username,
      password: hash,
    });
    res.json("Creado correctamente");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await users.findOne({
    where: { username: user.username },
  });

  if (!user) res.json({ error: "El usuario ingresado no existe" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Contraseña incorrecta" });

    const accessToken = sign(
      {
        username: user.username,
        id: user.id,
        user_role: user.user_role,
        favs: user.favs,
      },
      "importantsecret"
    );
    res.json({
      token: accessToken,
      username: username,
      id: user.id,
      user_role: user.user_role,
      favs: user.favs,
    });
  });
});
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

module.exports = router;
