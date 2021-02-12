var socket = io.connect('localhost:3000');

const chat_form = document.querySelector("#chatForm");
const message = document.getElementById("txt");

// submit text message without reload/refresh the page
chat_form.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit('chat_message', message.value);
  message.value = '';
});

// // submit text message without reload/refresh the page
// $('form').submit(function(e){
//     e.preventDefault(); // prevents page reloading
//     socket.emit('chat_message', $('#txt').val());
//     $('#txt').val('');
//     return false;
// });

// append the chat text message
socket.on('chat_message', (msg) => {
    let old = document.querySelector("#messages").innerHTML;
    old += `<li>${msg}</li>`;
    document.querySelector("#messages").innerHTML = old;
});

// append text if someone is online
// socket.on('is_online', (username) => {
//     $('#messages').append($('<li>').html(username));
// });

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