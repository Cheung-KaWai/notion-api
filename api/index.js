require("dotenv").config();
const express = require("express");
const notion = require("../services/notion");
const app = express();

app.get("/database", async (req, res) => {
  const data = await notion.getDatabase();
  res.send(data);
});

app.listen(process.env.PORT);

module.exports = app;
