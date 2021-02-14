const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({show: false});
  win.maximize();
  win.show();
  win.loadFile('client/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const express = require('express');
const exp = express();
const http = require('http').Server(exp);
const io = require('socket.io')(http);
const mysql = require('mysql');

const pool = mysql.createPool({
    host     : '68.114.104.121',    // enter IP of DB here
    port     : '30000',             // specify port
    user     : 'clebo',             // DB username
    password : 'SMTTT424',          // DB password
    database : 'sys'                // target schema
});

// exp.get('/', (req, res) => {
//     res.render('index.html');
// });

exp.use(express.static('client'));
exp.use(express.json());

// io.sockets.on('connection', (socket) => {
//     socket.on('username', (username) => {
//         io.emit('is_online', username);
//         pullChatHistory(socket);
//     });

//     // socket.on('disconnect', () => {
//     //     io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
//     // });

//     socket.on('chat_message', (message) => {
//         pushChatMessage(message);
//         io.emit('chat_message', message);
//     });
// });

const server = http.listen(3000, () => {
    console.log('listening on *:3000');
});


// function pullChatHistory(socket) {
//     // prepare query
//     const sql = "SELECT * FROM chat ORDER BY timestamp";

//     // run query
//     pool.query(sql, (err, res) => {
//         if (err) {
//             console.error('Error with query: ' + err.stack);
//             return;
//         } else {
//             res.forEach((row) => {
//                 socket.emit('chat_message', row);
//             });
//             // io.emit('is_online', socket.username);
            
//             return;
//         }
//     });
// }

// function pushChatMessage(message) {
//     // prepare query
//     let sql = `INSERT INTO chat SET
//                 username = ${mysql.escape(message.username)},
//                 timestamp = ${mysql.escape(message.timestamp)},
//                 msg = ${mysql.escape(message.msg)},
//                 room_num = ${mysql.escape(message.room_num)}`;

//     // run query
//     pool.query(sql, (err) => {
//         if (err) {
//             console.error('Error with query: ' + err.stack);
//         }
//     });    
// }