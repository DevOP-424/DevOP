console.log("outside");
import React from "react";

import './board.css';
import Draggable from 'react-draggable';
import Card from '../board/card';
//
import card from "../board/card";




export default class Board extends React.Component{

  constructor(){
    super ();
    this.if_add_task  = this.if_add_task.bind(this);
  }

  
  if_add(){
          if(document.querySelector('#addcol')){
            document.querySelector('#addcol').addEventListener('click', () => {
            let col = document.createElement('div');
            col.setAttribute('class', 'column');
            // let txt = document.createElement('input')
            // txt.setAttribute('type' , 'text');
            // txt.setAttribute('class', 'tasktitle');/*new */
            // txt.setAttribute('placeholder' , '....');
            
            /*add task button*/
            // let btn = document.createElement('button');
            // btn.setAttribute('class', 'addtask');
            // btn.setAttribute('id', 'addtask')
            // btn.textContent = ' Add Task ';
            // let i = document.createElement('i');
            // i.setAttribute('class', 'fa fa-plus');
            // btn.appendChild(i); 
            
            // col.append(txt);
            /*attempt 2 task button*/
            col.innerHTML = "<input type='text' class='tasktitle' placeholder='...'></input><button id='addtask'class='addtask' > Add Task <i class='fa fa-plus'></i></button>";
            // col.append(btn);
            document.querySelector(".column-container").append(col);
          });
        }
      }

      if_add_task(){
        if(document.querySelector('#addtask')){
          
           
            

            let div = document.createElement('div');
            div.setAttribute('class', 'taskcard');
            div.innerHTML = "<label className='cardnametitle'>Name "+
            "<input type='text' className='cardfirstlastname' ></input></label><br/><label className='cardtasktitle'onClick={this.if_add_task}>"+
                "Task   <input type='text' className='cardassigntask'></input></label>";
            
            
            document.querySelector(".column").append(div);
    
          
    
        }
    }


  render(){
    console.log("inside");
    
    return(
      <>
      <div class='column-container'>
      <div class='column' id='col1'>
        <input type='text' class='tasktitle' placeholder='TODO'></input>
        <button id='addtask' class='addtask'onClick={this.if_add_task}> Add Task <i class='fa fa-plus'></i></button>
        <Card/>
        {/* <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div> */}
      </div>
      <div class='column' id='col2'>
        <input type='text' class='tasktitle' placeholder='In Progress'></input>
        <button id='addtask'class='addtask' > Add Task <i class='fa fa-plus'></i></button>
        {/*<Card />*/}
        {/* <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div> */}
      </div>
      <div class='column' id='col3'>
        <input type='text' class='tasktitle'  placeholder='Done'></input>
        <button id='addtask' class='addtask' > Add Task <i class='fa fa-plus'></i></button>
        {/*<Card/>*/}
        {/* <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div> */}
      </div>
      </div>
      <button id = 'addcol' onClick = {this.if_add.bind(this)}><span >&#43;</span></button>
      </>
    );
  }  
}













