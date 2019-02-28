let express = require("express");
let opn = require("opn");
let path = require("path");
let app = express();

// Routes
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Listening
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
