// const { app, BrowserWindow } = require('electron')

// function createWindow () {
//   const win = new BrowserWindow({show: false});
//   win.maximize();
//   win.show();
//   win.loadFile('index.html')
// }

// app.whenReady().then(createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })

const express = require('express');
const exp = express();
const http = require('http').Server(exp);
const io = require('socket.io')(http);
const mysql = require('mysql');
const path = require('path');

var connection = mysql.createConnection({
    host     : '68.114.104.121', // enter IP of DB here
    port     : '30000', // specify port
    user     : 'clebo', // DB username
    password : 'SMTTT424', // DB password
    database : 'sys' // target schema
});

// connect to db
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    } else {
        console.log('Connected as id ' + connection.threadId);
    }
});

// exp.get('/', (req, res) => {
//     res.render('index.html');
// });

exp.use(express.static('client'));

io.sockets.on('connection', (socket) => {
    console.log('does this work? 1')
    socket.on('username', (username) => {
        socket.username = username;
        pullChatHistory(socket);
    });

    socket.on('disconnect', (username) => {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })
    console.log('does this work?2')
    socket.on('chat_message', (message) => {
        console.log('does this work?3')
        pushChatMessage(socket.username, message);
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(3000, () => {
    console.log('listening on *:3000');
});


function pullChatHistory(socket) {
    // prepare query
    const sql = "SELECT * FROM chat ORDER BY timestamp";

    // run query
    connection.query(sql, (err, res) => {
        if (err) {
            console.error('Error with query: ' + err.stack);
            return;
        } else {
            console.log(res);
            res.forEach((row) => {
                socket.emit('chat_message', `<strong>${row.username}: </strong>${row.msg}`);
            });
            io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
            
            return;
        }
    });
}

function pushChatMessage(username, message) {
    // prepare query
    const name = username;
    const time = Date.now();
    const msg = message;
    const room_num = 1;
    let sql = `INSERT INTO chat SET
                username = ${mysql.escape(name)},
                timestamp = ${mysql.escape(time)},
                msg = ${mysql.escape(msg)},
                room_num = ${mysql.escape(room_num)}`;

    // run query
    connection.query(sql, (err, res) => {
        if (err) {
            console.error('Error with query: ' + err.stack);
            return;
        } else {
            console.log("Result: " + res);
        }
    });    
}