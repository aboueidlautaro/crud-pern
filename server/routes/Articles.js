const express = require("express");
const router = express.Router();
const { articles } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const allArticles = await articles.findAll();
  res.json({ allArticles: allArticles });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const article = await articles.findByPk(id);
  res.json(article);
});

router.post("/", validateToken, async (req, res) => {
  const article = req.body;
  article.username = req.user.username;
  article.userId = req.user.id;

  await articles.create(article);
  res.json(article);
});

router.delete("/:articleId", validateToken, async (req, res) => {
  const articleId = req.params.articleId;

  await articles.destroy({
    where: {
      id: articleId,
    },
  });
  res.json("Articulo eliminado con éxito");
});

module.exports = router;
