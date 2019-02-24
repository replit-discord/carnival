let express = require("express");
let app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
let path = require("path");

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

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
      console.log(playerList);
      // After deleting a user, update to all other clients
      socket.broadcast.emit("player-update", playerList); // to all clients connected
    });

    // Log if a guest user was disconnected
    socket.on("disconnect", () => console.log("Guest User Disconnected"));
  });
});

const port = process.env.PORT || 4001;
server.listen(port, () => {
  console.log(`Working on port ${port}`);
});

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
    console.log(`[server] Deleting disconnected user: Comparing ${playerName} with ${player.name}`);
    if (playerName === player.name) {
      playerListArray.splice(index, 1);
    }
  });
}
