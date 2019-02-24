let express = require("express");
let opn = require("opn");
let path = require("path");

let app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(express.static("public"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
