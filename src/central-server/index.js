const express = require("express");
const Provider = require("openid-client");
let path = require("path");
let app = express();

// Main
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Auth


// App
const port = process.env.PORT || 3101;
app.listen(port, () => {
  console.log(`_____Working on port ${port}`);
});