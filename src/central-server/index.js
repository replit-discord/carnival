let express = require("express");
const Provider = require("openid-client");
let path = require("path");
let app = express();

// Main
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Auth
const { Issuer } = require("openid-client");
Issuer.discover("http://localhost:3100") // => Promise
  .then(function(googleIssuer) {
    console.log(
      "Discovered issuer %s %O",
      googleIssuer.issuer,
      googleIssuer.metadata
    );
    console.log("[Client] OIDC Server Found");

    const client = new googleIssuer.Client({
      client_id: "RST",
      client_secret: "RomeoSierraTango"
    }); // => Client

    console.log("Upsilon", client);
    afterAuth(client);
  })
  .catch(e => console.log("[Client] OIDC Server NOT Found"));

function afterAuth(client) {
  app.get("/launch-auth-flow", (req, res) => {
    let url = client.authorizationUrl({
      redirect_uri: "http://localhost:3101/callback",
      scope: "openid email"
    }); // => String (URL)
    res.redirect(url);
  });

  app.get("/callback", (req, res) => {
    res.send("<p>Callbacked!!!! :D</p>");
  });

  // App
  const port = process.env.PORT || 3101;
  app.listen(port, () => {
    console.log(`Working on port ${port}`);
  });
}
