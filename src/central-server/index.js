let express = require("express");
const Provider = require('openid-client');
let path = require("path");
let app = express();

// Main
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/launch-auth-flow", (req, res) => {

});

const port = process.env.PORT || 3101;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});