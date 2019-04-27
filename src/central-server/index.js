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
    })
    .then(() => afterAuth(client));

    // afterAuth(client);
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
    // Related https://github.com/panva/node-openid-client/issues/150
    console.log(req.query);
    console.log(req.params);
    const query = req.query;

    const checks = {
      response_type: "code"
    };

    client
      .authorizationCallback("http://localhost:3101/callback", query, checks)
      .catch(e => console.log(e));
    // console.log(res);
    // const query = qs.parse(callbackUri.query);
    // const { state, response_type } = session[authorizationRequestState];
    // client
    //   .authorizationCallback(
    //     "http://localhost:3101/callback",
    //     req.query /*,
    //     { state, response_type }*/
    //   ) // => Promise
    //   .then(function(tokenSet) {
    //     console.log("received and validated tokens %j", tokenSet);
    //     console.log("validated id_token claims %j", tokenSet.claims);
    //   }).catch(e => console.log("alfa", e));

    res.send("<p>Callbacked!!!! :D</p>");
  });


}

// App
const port = process.env.PORT || 3101;
app.listen(port, () => {
  console.log(`_____Working on port ${port}`);
});