// Load environmental variables
require("dotenv").config();

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
  host: process.env.DB_HOST, // enter IP of DB here
  port: process.env.DB_PORT, // specify port
  user: process.env.DB_USER, // DB username
  password: process.env.DB_PASS, // DB password
  database: process.env.DB_TABLE, // target schema
});

// Configure socket and events
io.sockets.on("connection", (socket) => {
  console.log("connected probably from Main");
  socket.on("username", (username) => {
    io.emit("is_online", username);
    pullChatHistory(socket);
  });

  socket.on("chat_message", (message) => {
    pushChatMessage(message);
    io.emit("chat_message", message);
  });

  socket.on("task_insert", (record) => {
    pushTaskRecord(record);
    io.emit("task_record", record);
  });

  socket.on("task_pull", () => {
    pullTaskHistory(socket);
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
function pushChatMessage(message) {
  // prepare query
  let sql = `INSERT INTO chat SET
                username = ${mysql.escape(message.username)},
                timestamp = ${mysql.escape(message.timestamp)},
                msg = ${mysql.escape(message.msg)},
                room_num = ${mysql.escape(message.room_num)}`;

  // run query
  pool.query(sql, (err) => {
    if (err) {
      // handle error
      console.error("Error with query: " + err.stack);
    }
  });
}

// Pull full task history on initial connection to chatroom
function pullTaskHistory(socket) {
  // prepare query
  const sql = "SELECT * FROM task";

  // run query
  pool.query(sql, (err, res) => {
    if (err) {
      // handle error
      console.error("Error with query: " + err.stack);
    } else {
      // emit each message one JSON at a time
      res.forEach((row) => {
        socket.emit("task_record", row);
      });
    }
  });
}

// Insert new task record into DB
function pushTaskRecord(record) {
  // prepare query
  let sql = `INSERT INTO task SET
              task_name = ${mysql.escape(record.TaskName)},
              task_number = ${mysql.escape(record.TaskNum)},
              user_id = (SELECT user_id FROM user WHERE user_name = ${mysql.escape(
                record.AssignedTo
              )}),
              description = ${mysql.escape(record.TaskDescription)},
              date_start = ${mysql.escape(record.StartDate)},
              date_end = ${mysql.escape(record.EndDate)}`;

  // run query
  pool.query(sql, (err) => {
    if (err) {
      // handle error
      console.error("Error with query: " + err.stack);
    }
  });
}
