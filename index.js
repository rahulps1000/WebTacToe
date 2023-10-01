const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { Game } = require("./games");

const { instrument } = require("@socket.io/admin-ui");

const app = express();
app.use(cors());

const server = http.createServer(app);

var games = {};

var origins = [
  "http://localhost:3000",
  "https://admin.socket.io",
  "https://webtactoe.vercel.app",
];

if (process.env.REACT_APP_UI_URL) {
  origins.push(process.env.REACT_APP_UI_URL);
}

const io = new Server(server, {
  cors: {
    origin: origins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("createRoom", (name) => {
    const roomId = Math.random().toString(36).substr(2, 8);
    socket.join(roomId);
    games[roomId] = new Game();
    games[roomId].admin = socket.id;
    games[roomId].names.admin = name;
    socket.emit("roomCreated", roomId);
  });
  socket.on("checkRoom", (roomId) => {
    const rooms = io.sockets.adapter.rooms;
    const room = rooms.get(roomId);
    if (room) {
      if (room.size > 1 && !room.has(socket.id)) {
        socket.emit("roomFull");
        return;
      }
      socket.emit("validRoom", roomId);
    } else {
      socket.emit("invalidRoom");
    }
  });
  socket.on("joinRoom", (roomId, name) => {
    const rooms = io.sockets.adapter.rooms;
    const room = rooms.get(roomId);
    if (room) {
      if (room.size > 1 && !room.has(socket.id)) {
        socket.emit("roomFull");
        return;
      }
      if (games[roomId].admin !== socket.id) {
        socket.join(roomId);
        games[roomId].co_player = socket.id;
        games[roomId].names.co = name;
        io.to(roomId).emit("userJoined");
      } else {
        socket.join(roomId);
      }
    } else {
      socket.emit("invalidRoom");
    }
  });

  socket.on("move", (roomId, v) => {
    const game = games[roomId];
    if (game) {
      game.mark(v);
      socket.to(roomId).emit("move");
    }
  });

  socket.on("startGame", (roomId) => {
    io.to(roomId).emit("startGame", games[roomId]);
  });

  socket.on("gameOver", (roomId) => {
    const game = games[roomId];
    const player = game.checkWinner();
    if (game) {
      if (player === "x") {
        games[roomId].names.admin = game.names.admin ?? "Player 1";
        games[roomId].score.admin = game.score.admin + 1;
      } else if (player === "o") {
        games[roomId].names.co = game.names.co ?? "Player 2";
        games[roomId].score.co = game.score.co + 1;
      } else if (player === "draw") {
        winner = "draw";
      } else {
        return;
      }
      io.to(roomId).emit("gameOver", games[roomId]);
    }
  });

  socket.on("resetBoard", (roomId) => {
    games[roomId].board = ["", "", "", "", "", "", "", "", ""];
  });
});
server.listen(5000, () => {
  console.log("listening on *:5000");
});

instrument(io, {
  auth: false,
});
