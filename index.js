require("dotenv").config();
const express = require("express");
const notion = require("./services/notion");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", async (_, res) => {
  res.send("welcome to my notion-api hehe :))");
});

app.get("/database", async (_, res) => {
  const data = await notion.getDatabase();
  res.send(data);
});

app.get("/articles", async (_, res) => {
  const articles = await notion.getListOfArticles();
  res.send(articles);
});

app.get("/article/:id", async (req, res) => {
  const articleId = req.params.id;
  const pageContent = await notion.getArticleContnet(articleId);
  res.send(pageContent);
});

app.listen(process.env.PORT);

module.exports = app;
