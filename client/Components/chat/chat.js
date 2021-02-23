import React from 'react'
const socket = io.connect('http://68.114.104.121:22446');
import './chat.css';

export default class Chat extends React.Component{

   componentDidMount(){
    console.log("chatFunction")
      // Pull in environment variables
      let username = 'James';
      let users = [];

      // use append() to add messages to chat history
      socket.on('chat_message', (msg) => {
        console.log(msg);
        // if message from self
        if (msg.username === username) {
          let newLi = document.createElement('li');
          newLi.classList.add('msg-self');
          newLi.textContent = msg.msg + " :" + msg.username;
          document.querySelector('#messages').append(newLi);
        } else {
          // otherwise message is from someone else
          let newLi = document.createElement('li');
          newLi.classList.add('msg-other');
          newLi.textContent = msg.username + ": " + msg.msg;
          document.querySelector('#messages').append(newLi);
        }
      
        // scroll chat window when msg recevied
        document.querySelector('#messages').scrollTo({
          top: document.querySelector('#messages').scrollHeight
        });
      });
      
      // send username at startup
      socket.emit('connection', username);
      
      // // capture username on connect
      // socket.on('is_online', (user) => {
      //   users.push(user);
      //   // create DOM elements for users
      //   users.forEach((user) => {
      //     console.log(user);
      //     let newUser = document.createElement('li');
      //     newUser.classList.add('people-li');
      //     newUser.textContent = user;
      //     document.querySelector('#people').append(newUser);
      //   });
      // });
      
      // TODO: Replace this with stuff from settings page
      socket.emit('username', username);
    
  }
  

  on_submit(e){ 
    const message = document.getElementById("txt");
    let username = 'James';
    let users = [];
    // submit text message without reload/refresh the page
      e.preventDefault();
      let time = Date.now()
      let chat_json = {
        username: username,
        timestamp: time,
        msg: message.value,
        room_num: 1
      };
      socket.emit('chat_message', chat_json);
      message.value = '';
  }

  render(){
    return(
      <>
      <div class="chat-container">
      <ul id="messages" ></ul>
        <form id="chatForm">
          <input id="txt" type="text"  autoComplete="off" autoFocus="on" placeholder="Enter message..." /><button id = "button"onClick = {this.on_submit.bind(this)}>Send</button>
        </form>
      </div>
      </>
    );
  }
}