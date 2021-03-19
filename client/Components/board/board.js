import React from "react";
import Task from "../TaskForm/task";
import { socket } from "../../socketHelper";
import "./board.css";

export default class Board extends React.Component {
  componentDidMount() {
    // this.socket = io.connect("http://localhost:22446");

    socket.emit("task_pull");

    // this.socket.on("task_record", (record) => {
    socket.on("task_record", (record) => {
      this.if_add_task(record);
      console.log(record);
    });
  }

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  if_add() {
    if (document.querySelector("#addcol")) {
      document.querySelector("#addcol").addEventListener("click", () => {
        let col = document.createElement("div");
        col.setAttribute("class", "column");
        let txt = document.createElement("input");
        txt.setAttribute("type", "text");
        txt.setAttribute("placeholder", "....");
        col.append(txt);
        document.querySelector(".column-container").append(col);
      });
    }
  }

  if_add_task(record) {
    let div = document.createElement("div");

    div.setAttribute("class", "taskcard");
    div.setAttribute("draggable", "true");
    div.innerHTML =
      "<label className='cardnametitle'>Name " +
      "<input type='text' className='cardfirstlastname' value=" +
      record.task_name +
      "}></input></label><br/><label className='cardtasktitle'onClick={this.if_add_task}>" +
      "Task   <input type='text' className='cardassigntask' value=TASK00000" +
      record.task_id +
      "></input></label>";

    document.querySelector(".column").append(div);
  }

  render() {
    return (
      <>
        <div class="column-container">
          <div class="column" id="col1">
            <input type="text" placeholder="TODO"></input>
          </div>
          <div class="column" id="col2">
            <input type="text" placeholder="In Progress"></input>
          </div>
          <div class="column" id="col3">
            <input type="text" placeholder="Done"></input>
          </div>
        </div>
        <button id="addcol" onClick={this.if_add.bind(this)}>
          <span>&#43;</span>
        </button>
      </>
    );
  }
}
