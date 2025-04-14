const http = require("http")
const express = require("express")
const { Server } = require("socket.io")

const app = express()


// This wraps your Express app inside a raw Node HTTP server.
// Required by Socket.IO so it can hook into HTTP requests and upgrade them to WebSocket connections.
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


// socket == user
io.on("connection", (socket) => {
  console.log(`A new user with id ${socket.id}`)

  socket.on("message", (message) => {
    socket.broadcast.emit("message",message)
  })

  socket.on("disconnect",() => {
    console.log("A use disconnected")
  })

})


server.listen(3001, () => {
  console.log("Server Started at PORT:3001")
})
