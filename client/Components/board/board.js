import React, { useContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { SettingsContext } from "../../SettingsContext";
import Card from "../board/card";
import Task from "../TaskForm/task";
import "./board.css";

export default function Board() {
  const [settings, setSettings] = useContext(SettingsContext);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(
      "http://" + settings.url + ":" + settings.port
    );

    socketRef.current.emit("task_pull");

    socketRef.current.on("task_record", (record) => {
      addTask(record);
    });

    // close connection
    return () => {
      socketRef.current.disconnect();
    };
  });

  const addColumn = () => {
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
  };

  const addTask = (record) => {
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
  };

  return (
    <>
      <div class="column-container">
        <div class="column" id="col1">
          <input type="text" class="tasktitle" placeholder="TODO"></input>
          <button id="addtask" class="addtask" onClick={addTask}>
            {" "}
            Add Task <i class="fa fa-plus"></i>
          </button>
          <Card />
          {/* <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div> */}
        </div>
        <div class="column" id="col2">
          <input
            type="text"
            class="tasktitle"
            placeholder="In Progress"
          ></input>
          <button id="addtask" class="addtask" onClick={addTask}>
            Add Task <i class="fa fa-plus"></i>
          </button>
          {/*<Card />*/}
          {/* <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div> */}
        </div>
        <div class="column" id="col3">
          <input type="text" class="tasktitle" placeholder="Done"></input>
          <button id="addtask" class="addtask" onClick={addTask}>
            Add Task <i class="fa fa-plus"></i>
          </button>
          {/*<Card/>*/}
          {/* <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div> */}
        </div>
      </div>
      <button id="addcol" onClick={addColumn}>
        <span>&#43;</span>
      </button>
    </>
  );
}
