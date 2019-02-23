import express from "express";
import opn from "opn";
import path from "path";
require("dotenv").config();

let app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(express.static("public"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
