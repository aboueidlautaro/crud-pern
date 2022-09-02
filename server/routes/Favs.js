const express = require("express");
const router = express.Router();
const { favs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const allFavs = await favs.findAll();
  res.json({ allFavs: allFavs });
});

router.get("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const fav = await favs.findByPk(id);
  res.json(fav);
});

router.post("/", validateToken, async (req, res) => {
  const fav = req.body;
  fav.username = req.user.username;
  fav.userId = req.user.id;

  await favs.create(fav);
  res.json(fav);
});

router.delete("/:favId", validateToken, async (req, res) => {
  const favId = req.params.favId;

  await favs.destroy({
    where: {
      id: favId,
    },
  });
  res.json("Fav eliminado con éxito");
});

module.exports = router;
