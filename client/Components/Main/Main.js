import React from "react";
import Board from "../board/board";
import Chat from "../chat/chat";
import Settings from "../settings/settings";
import Teams from "../teamView/team";
import { NavLink, Switch, Route } from "react-router-dom";
import "./main.css";

export default function Main() {
  const motion = (e) => {
    e.preventDefault();
    // Accordion animation on navbar
    e.target.classList.toggle("active");
    let panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  };

  return (
    <>
      <div class="grid-container">
        <div class="header">
          <h3>
            Search<input type="text" placeholder="..."></input>
          </h3>
        </div>
        <div class="NavBar">
          <button class="accordion" onClick={motion}>
            Taskboard
          </button>
          <div class="panel">
            <NavLink id="link" to="/board">
              My Taskboard
            </NavLink>
          </div>
          <button class="accordion" onClick={motion}>
            Team
          </button>
          <div class="panel">
            <NavLink id="link" to="/team">
              DevOP
            </NavLink>
          </div>
          <button class="accordion" onClick={motion}>
            Chats
          </button>
          <div class="panel">
            <NavLink id="link" to="/chat">
              People
            </NavLink>
          </div>
          <button class="accordion" onClick={motion}>
            Settings
          </button>
          <div class="panel">
            <NavLink id="link" to="/settings">
              Settings
            </NavLink>
          </div>
        </div>
        <div className="main-content">
          <Switch>
            <Route path="/board" Component={Board}>
              <Board />
            </Route>
            <Route path="/chat" Component={Chat}>
              <Chat />
            </Route>
            <Route path="/team" Component={Teams}>
              <Teams />
            </Route>
            <Route path="/settings" Component={Settings}>
              <Settings />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
