let express = require("express");
let expressSession = require("express-session");
let passport = require("passport");
let Provider = require("openid-client");
let path = require("path");
let app = express();

// Main
app.use(express.static("public"));
app.use(passport.initialize());
app.use(
  expressSession({
    secret: "victorWhiskeyXray",
    resave: true,
    saveUninitialized: false
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Auth
let { Issuer, Strategy } = require("openid-client");

// Create issuer representing delegated authorization server
let theURL;
let theClient;
Issuer.discover("http://localhost:3100") // => Promise
  .then(issuer => {
    console.log("Discovered issuer %s %O", issuer.issuer, issuer.metadata);
    console.log("[Client] OIDC Server Found");

    // TODO: Cleanup
    // Setup client stuff
    const client = new issuer.Client({
      client_id: "RST",
      client_secret: "RomeoSierraTango",

      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      id_token_signed_response_alg: "RS256",
      token_endpoint_auth_method: "client_secret_basic"
    }); // => Client
    theClient = client;

    let authURL = client.authorizationUrl({
      redirect_uri: "http://localhost:3101/callback",
      scope: "openid email"
    }); // => String (URL)
    theURL = authURL;
    console.log("MU", authURL);
  })
  .catch(e => console.log(e));

app.get("/launch-auth-flow", (req, res) => {
  console.log("@@@redirect", theURL);
  res.redirect(theURL);
});

app.get("/callback", (req, res) => {
  // res.send(`You got called back!`);
  // let state = stateParam;
  let response_type = "code";
  // const { state, response_type } = session[authorizationRequestState];
  theClient
    .authorizationCallback("http://localhost:3101/callback", req.query, {
      response_type
    }) // => Promise
    .then(tokenSet => {
      console.log("received and validated tokens %j", tokenSet);
      console.log("validated id_token claims %j", tokenSet.claims);
    })
    .catch(e => console.log("eta", e));
});

// App
const port = process.env.PORT || 3101;
app.listen(port, () => {
  console.log(`_____Working on port ${port}`);
});
