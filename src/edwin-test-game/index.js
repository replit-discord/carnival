import express from "express";
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

// // Event when user connects
// io.on("connection", socket => {
//   console.log("a user connected");
// });

// Event when user connects and disconnects
io.on("connection", socket => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// If recieve message after connection, print it
io.on("connection", socket => {
  socket.on("chat message", msg => {
    console.log("message: " + msg);
  });
});

io.emit("some event", { for: "everyone" });

io.on("connection", socket => {
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT || 4001;
// express app.listen does not work
// app.listen(port, () => {
//   console.log(`Working on port ${port}`);
// });

http.listen(port, () => {
  console.log(`Working on port ${port}`);
});
