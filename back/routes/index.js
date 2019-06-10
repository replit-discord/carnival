var express = require("express");
var router = express.Router();
const { discoId, discoSecret } = require("../config");
const discoOAuthClient = require("disco-oauth");
const { Pool } = require("pg");
const discoClient = new discoOAuthClient(discoId, discoSecret);

const dbPool = new Pool({
  connectionString: `postgres://postgres:root@localhost:5432/carnival_db`
});
dbPool.connect().catch(e => {
  console.error(e);
  process.exit(5);
});

discoClient.setScopes(["identify", "email"]);
discoClient.setRedirect("http://localhost:3000/login/discord");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/auth/:provider", (req, res) => {
  switch (req.params["provider"].toLowerCase()) {
    case "discord":
      res.redirect(discoClient.getAuthCodeLink());
      break;
  }
});

router.get("/login/:provider", async (req, res) => {
  switch (req.params["provider"].toLowerCase()) {
    case "discord":
      let key = await discoClient.getAccess(req.query.code);
      res.send(await discoClient.getAuthorizedUser(key).catch(console.log));
      break;
  }
});

module.exports = router;
