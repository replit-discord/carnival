const express = require("express");
const Provider = require("oidc-provider");
const app = express();

const clients = [
  {
    client_id: "test_app",
    grant_types: ["authorization_code"],
    response_types: ["code"],
    redirect_uris: ["https://testapp/signin-oidc"],
    token_endpoint_auth_method: "none"
  }
];

const oidcConfiguration = {
  scopes: ["api1"],
  claims: {
    profile: ["name", "email", "picture"]
  }
};

const port = process.env.PORT || 3100;
const oidc = new Provider(`http://localhost:${port}`, oidcConfiguration);

oidc.initialize({ clients }).then(function() {
  console.log(clients);
  app.use("/", oidc.callback);
  app.listen(port);
});
