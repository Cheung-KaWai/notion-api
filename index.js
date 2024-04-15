require("dotenv").config();
const express = require("express");
const notion = require("./services/notion");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("welcome to my notion-api hehe :))");
});

app.get("/database", async (req, res) => {
  const data = await notion.getDatabase();
  res.send(data);
});

app.get("/articles", async (req, res) => {
  const pages = await notion.getDatabaseContent();
  const pageContent = await notion.getPageContent(pages[0]);
  res.send(pageContent);
});

app.listen(process.env.PORT);

module.exports = app;
