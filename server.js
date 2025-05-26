const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());

// Serve static files from "public" folder (if needed)
app.use(express.static("public"));

// Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "*", // You can replace * with your Netlify domain for more security
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Use environment port or default to 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
