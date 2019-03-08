// let express = require("express");
// const Provider = require('oidc-provider');
// let path = require("path");
// const url = require('url');
// let app = express();

// Main
// app.use(express.static("public"));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });
//
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Working on port ${port}`);
// });



const Provider = require('oidc-provider');
const configuration = {
  // ... see available options /docs/configuration.md
};
const clients = [{
  client_id: 'foo',
  client_secret: 'bar',
  redirect_uris: ['http://lvh.me:8080/cb'],
  // token_endpoint_auth_method, grant_types, response_types
  // + other client properties
}];

const oidc = new Provider('http://localhost:3000', configuration);

let server;
(async () => {
  await oidc.initialize({ clients });
  // express/nodejs style application callback (req, res, next) for use with express apps, see /examples/express.js
  oidc.callback;

  // koa application for use with koa apps, see /examples/koa.js
  oidc.app;

  // or just expose a server standalone, see /examples/standalone.js
  server = oidc.listen(3000, () => {
    console.log('oidc-provider listening on port 3000, check http://localhost:3000/openid');
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});