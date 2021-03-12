// Required packages
const express = require("express");

// Set express and configure middleware
const exp = express();
exp.use(express.json());

// Create http server, depedent on express server
const http = require("http").Server(exp);

// Create socket, dependent on http server
const io = require("socket.io")(http);
const mysql = require("mysql");

// Configure DB connection pool
const pool = mysql.createPool({
  host: "68.114.104.121", // enter IP of DB here
  port: "30000", // specify port
  user: "kwhite", // DB username
  password: "SMTTT424", // DB password
  database: "devops", // target schema
});

// Configure socket and events
io.sockets.on("connection", (socket) => {
  socket.on("sender_id", (sender_id) => {
    io.emit("is_online", sender_id);
    pullChatHistory(socket);
    socket.on('disconnect',()=>{
      console.log('user has left');
    })
  });

  socket.on("chat_message", (messages) => {
    pushChatMessage(messages);
    io.emit("chat_message", messages);
  });
});

// Configure listen port for socket connections
const server = http.listen(22446, () => {
  console.log("listening on *:22446");
});

// Pull full chat history on initial connection to chatroom
function pullChatHistory(socket) {
  // prepare query
  const sql = "SELECT * FROM message ORDER BY created_at";

  // run query
  pool.query(sql, (err, res) => {
    if (err) {
      // handle error
      console.error("Error with query: " + err.stack);
    } else {
      // emit each message one JSON at a time
      
      res.forEach((row) => {
        socket.emit("chat_message", row);
      });
    }
  });
}

// Insert new chat message into DB
function pushChatMessage(messages) {
  // prepare query
  
  let sql = `INSERT INTO message SET
                sender_id = ${mysql.escape(messages.sender_id)},
                text = ${mysql.escape(messages.text)},
                room_name = ${mysql.escape(messages.room_name)}`;

  // run query
  pool.query(sql, (err) => {
    if (err) {
      // handle error
      console.error("Error with query: " + err.stack);
    }
  });
}
