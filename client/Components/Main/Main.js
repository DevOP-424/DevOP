import React from "react";
import Board from "../board/board";
import Chat from "../chat/chat";
import Settings from '../settings/settings';
import Teams from '../teamView/team';

import { NavLink, Switch, Route } from 'react-router-dom';
import './main.css';


class Main extends React.Component{

  constructor() {
    super();
    this.state = {
      name: "React",
    };
    this.motion = this.motion.bind(this);
  }

  motion(e){
    e.preventDefault();
    // Accordion animation on navbar
    e.target.classList.toggle("active");
    let panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
  

  render(){
    return(
        <>
        {/*icon library*/}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div class="grid-container">
          <div class="header">
            <h3>Search<input type="text" placeholder="...."></input></h3>
          </div>
          <div class="NavBar" >
            <button class="accordion" onClick={this.motion}>Taskboard</button>
            <div class="panel"><NavLink id='link' to='/board'>My Taskboard</NavLink></div>
            <button class="accordion" onClick={this.motion}>Team</button>
            <div class="panel"><NavLink id='link' to='/team'>DevOP</NavLink></div>
            <button class="accordion" onClick={this.motion}>Chats</button>
            <div class="panel"><NavLink id='link' to ='/chat'>People</NavLink></div>
            <button class="accordion" onClick={this.motion}>Settings</button>
            <div class="panel"><NavLink id='link' to ='/settings'>Settings</NavLink></div>
          </div>
          <div className="main-content">
            <Switch>
            <Route path="/board" Component={ Board }><Board /></Route>
            <Route path = "/chat" Component={Chat}><Chat /></Route>
            <Route path = "/team" Component={Teams}><Teams /></Route>
            <Route path = "/settings" Component={Settings}><Settings /></Route>
            </Switch>
          </div>  
        </div> 
        </>
    );
  }
}

export default Main;