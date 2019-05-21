let express = require("express");
let app = express();
let passport = require("passport");
let OpenIDStrategy = require("passport-openid").Strategy;
let server = require("http").Server(app);
let io = require("socket.io")(server);
let path = require("path");

// Auth
// Use the OpenIDStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier), and invoke a callback
//   with a user object.
passport.use(
  new OpenIDStrategy(
    {

      returnURL: "http://localhost:3102/auth/openid/v1/callback",
      realm: "http://localhost:3101",
      profile: true,
      pape: { maxAuthAge: 600 }


    },
    function(identifier, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's OpenID identifier is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the OpenID identifier with a user record in your database,
        // and return that user instead.
        return done(null, { identifier: identifier });
      });
    }
  )
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// Main
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/login", (req, res) => {
  res.send(`<h1>Login</h1><a href="/">Login here</a>`);
});

// After lclick button
app.get("/auth/openid/v1", passport.authenticate("openid", { failureRedirect: "/login" }), function(req, res) {
  res.redirect("/");
});

app.get("/auth/openid/v1/callback", function(req, res) {
  res.redirect('/');
});

const port = process.env.PORT || 3102;
server.listen(port, () => {
  console.log(`Working on port ${port}`);
});

// Game
let playerList = [];
io.on("connection", function(socket) {
  console.log("Guest User Connected");

  // Right after connecting give client current playerlist
  socket.emit("player-update", playerList);

  // If receive an event to add a player, do so
  socket.on("add-player", function(playerName) {
    console.log(`[server]: Recieving request. Adding player: ${playerName}`);
    playerList.push({
      name: playerName,
      points: 0
    });

    // After adding a player, emit event with updated player list to all clients
    socket.emit("player-update", playerList); // to client I'm talking to right now
    socket.broadcast.emit("player-update", playerList); // to all clients connected

    socket.on("increment-points", function(playerName) {
      incrementPlayerPoints(playerName);

      // After updating playerlist, send it out again to all clients
      socket.emit("player-update", playerList); // to client I'm talking to right now
      socket.broadcast.emit("player-update", playerList); // to all clients connected
    });

    // On a client disconnection
    socket.on("disconnect", function() {
      console.log(`[server] ${playerName} Disconnected`);
      deletePlayerFromPlayerList(playerName);
      // After deleting a user, update to all other clients
      socket.broadcast.emit("player-update", playerList); // to all clients connected
    });

    // Log if a guest user was disconnected
    socket.on("disconnect", () => console.log("Guest User Disconnected"));
  });
});

// RUESABLE FUNCTIONS \\
// playerList refers to the global object playerList
function incrementPlayerPoints(playerName) {
  playerList.forEach((player, index, playerListArray) => {
    if (playerName === player.name) {
      playerListArray[index].points++;
    }
  });
}

// playerList refers to the global object playerList
function deletePlayerFromPlayerList(playerName) {
  playerList.forEach((player, index, playerListArray) => {
    // console.log(`[server] Deleting disconnected user: Comparing ${playerName} with ${player.name}`);
    if (playerName === player.name) {
      playerListArray.splice(index, 1);
    }
  });
}
