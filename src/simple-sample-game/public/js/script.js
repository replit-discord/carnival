let socket = io();

// Global object variable for holding player name
let globalPlayer = {
  name: ""
};

// MAIN LOGIC \\
// When someone clicks on "Join Game Button", tell server to add the player
let joinGameButton = document.getElementById("join-game-button");
joinGameButton.addEventListener("click", function() {
  let name = document.getElementById("name-field").value; // where you enter in your name
  console.log(`[client]: Sending request to server to add player: ${name}`);
  socket.emit("add-player", name); // Send request to server
  replaceUserInterface(name); // Change user interface when signing in
  globalPlayer.name = name;
});

// When someone clicks increment points button, send that request to the server
let incrementPointsButton = document.getElementById("increment-points-button");
incrementPointsButton.addEventListener("click", function() {
  socket.emit("increment-points", globalPlayer.name);
});

// When server says there's more players, update the DOM with those new players
socket.on("player-update", function(newPlayerList) {
  console.log(`[client]: Recieving request to update player list. Total players: ${newPlayerList.length + 1}`);
  updatePlayerStats(newPlayerList);
});

// REUSABLE FUNCTIONS \\
function replaceUserInterface(name) {
  let instructionsUI = document.getElementById("instructions-ui-stuff");
  instructionsUI.classList.remove("totally-visible");
  instructionsUI.classList.add("totally-not-visible");

  let gameUI = document.getElementById("game-ui-stuff");
  gameUI.classList.remove("totally-not-visible");
  gameUI.classList.add("totally-visible");
}

function updatePlayerStats(playerListData) {
  // console.log(playerListData);
  let playerList = document.getElementById("player-list");

  let newPlayerList = document.createElement("tbody");
  for (let i = 0; i < playerListData.length; i++) {
    let tr = document.createElement("tr");

    let td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(playerListData[i].name));
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(playerListData[i].points));
    tr.appendChild(td3);

    newPlayerList.appendChild(tr);
  }
  // Since we're creating a whole new element, we need to put the same id on it as before
  newPlayerList.setAttribute("id", "player-list");

  playerList.parentNode.replaceChild(newPlayerList, playerList);
}
