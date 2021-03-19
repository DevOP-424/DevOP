import React from "react";
import { socket } from "../../socketHelper";
import Settings from "../settings/settings";
import "./chat.css";

export default class Chat extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const username = "chris";

    const message = document.querySelector("#txt");
    document.querySelector("#chatForm").addEventListener("submit", (e) => {
      e.preventDefault();
      let time = Date.now();
      let chat_json = {
        username: username,
        timestamp: time,
        msg: message.value,
        room_num: 1,
      };
      socket.emit("chat_message", chat_json);
      message.value = "";
    });

    // use append() to add messages to chat history
    socket.on("chat_message", (msg) => {
      // if message from self
      if (msg.username === username) {
        let newLi = document.createElement("li");
        newLi.classList.add("msg-self");
        newLi.textContent = msg.msg + " :" + msg.username;
        document.querySelector("#messages").append(newLi);
      } else {
        // otherwise message is from someone else
        let newLi = document.createElement("li");
        newLi.classList.add("msg-other");
        newLi.textContent = msg.username + ": " + msg.msg;
        document.querySelector("#messages").append(newLi);
      }

      // scroll chat window when msg recevied
      document.querySelector("#messages").scrollTo({
        top: document.querySelector("#messages").scrollHeight,
      });
    });

    // send username at startup
    socket.emit("connection");
    socket.emit("username", username);
  }

  render() {
    return (
      <>
        <div class="chat-container">
          <ul id="messages"></ul>
          <form id="chatForm">
            <input
              id="txt"
              type="text"
              autoComplete="off"
              autoFocus="on"
              placeholder="Enter message..."
            />
            <button id="button">Send</button>
          </form>
        </div>
      </>
    );
  }
}
