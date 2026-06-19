require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Real-Time Chat Server Running");
});

const users = {};

io.on("connection", (socket) => {

    console.log(`User Connected: ${socket.id}`);

    // Join Room
    socket.on("joinRoom", ({ username, room }) => {

        socket.join(room);

        users[socket.id] = {
            username,
            room
        };

        console.log(`${username} joined ${room}`);

        socket.emit("message", {
            sender: "System",
            text: `Welcome to ${room}`
        });

        socket.to(room).emit("message", {
            sender: "System",
            text: `${username} joined the room`
        });

        const roomUsers = Object.values(users)
            .filter(user => user.room === room)
            .map(user => user.username);

        io.to(room).emit("roomUsers", roomUsers);
    });

    // Chat Message
    socket.on("chatMessage", (message) => {

        const user = users[socket.id];

        if (!user) return;

        io.to(user.room).emit("message", {
            sender: user.username,
            text: message,
            time: new Date().toLocaleTimeString()
        });
    });

    // Leave Room
    socket.on("leaveRoom", () => {

        const user = users[socket.id];

        if (!user) return;

        socket.leave(user.room);

        socket.to(user.room).emit("message", {
            sender: "System",
            text: `${user.username} left the room`
        });

        delete users[socket.id];
    });

    // Disconnect
    socket.on("disconnect", () => {

        const user = users[socket.id];

        if (user) {

            socket.to(user.room).emit("message", {
                sender: "System",
                text: `${user.username} disconnected`
            });

            delete users[socket.id];
        }

        console.log(`Disconnected: ${socket.id}`);
    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});