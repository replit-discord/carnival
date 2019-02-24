let express = require("express");
let path = require("path");

let app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.use(express.static("public"));

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
