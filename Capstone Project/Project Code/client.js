var socket = io.connect('localhost:3000');

const button = document.querySelector("#button");
const message = document.querySelector("#txt");

// submit text message without reload/refresh the page
button.addEventListener("click", () => {
  preventDefault();
  socket.emit('chat_message', message.textContent);
  message.textContent = '';
});

// // submit text message without reload/refresh the page
// $('form').submit(function(e){
//     e.preventDefault(); // prevents page reloading
//     socket.emit('chat_message', $('#txt').val());
//     $('#txt').val('');
//     return false;
// });

// append the chat text message
socket.on('chat_message', function(msg){
    console.log(msg);
    document.querySelector("#messages").innerHTML = `<li>${msg}</li>`;
});

// append text if someone is online
socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
});

// ask username
let username = 'chris';
socket.emit('username', username);

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}