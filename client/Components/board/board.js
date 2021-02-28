console.log("outside");
import React from "react";

import './board.css';
import Card from '../card/card';
import './card.css';




export default class Board extends React.Component{
  
  if_add(){
          if(document.querySelector('#addcol')){
            document.querySelector('#addcol').addEventListener('click', () => {
            let col = document.createElement('div');
            col.setAttribute('class', 'column');
            let txt = document.createElement('input')
            txt.setAttribute('type' , 'text');
            txt.setAttribute('placeholder' , '....');
            /*add task button*/
            let btn = document.createElement('button');
            btn.setAttribute('class', 'addtask');
            btn.textContent = ' Add Task ';
            let i = document.createElement('i');
            i.setAttribute('class', 'fa fa-plus');
            btn.appendChild(i);
            
            col.append(txt);
            col.append(btn);
            document.querySelector(".column-container").append(col);
          });
        }
      }

  render(){
    console.log("inside");
    
    return(
      <>
      <div class="column-container">
      <div class="column" id="col1">
        <input type="text" placeholder="TODO"></input>
        <button class="addtask"> Add Task <i class="fa fa-plus"></i></button>
        <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div>
      </div>
      <div class="column" id="col2">
        <input type="text" placeholder="In Progress"></input>
        <button class="addtask">Add Task <i class="fa fa-plus"></i></button>
        <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div>
      </div>
      <div class="column" id="col3">
        <input type="text" placeholder="Done"></input>
        <button class="addtask"> Add Task <i class="fa fa-plus"></i></button>
        <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div>
      </div>
      </div>
      <button id = 'addcol' onClick = {this.if_add.bind(this)}><span >&#43;</span></button>
      </>
    );
  }  
}













