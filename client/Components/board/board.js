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

    socketRef.current.emit("column_pull");

    socketRef.current.on("column_record", (record) => {
      addColumn(record);
    });

    socketRef.current.emit("task_pull");

    socketRef.current.on("task_record", (record) => {
      addTask(record);
    });

    // close connection
    return () => {
      socketRef.current.disconnect();
    };
  });

  const addColumn = (record) => {
    let col = document.createElement("div");
    col.setAttribute("class", "column");
    col.setAttribute("id", "col" + record.column_id);
    let txt = document.createElement("input");
    txt.setAttribute("type", "text");
    txt.setAttribute("placeholder", record.column_name);
    col.append(txt);
    let btn = document.createElement("button");
    btn.setAttribute("class", "addtask");
    btn.setAttribute("id", "addtask");
    btn.setAttribute("onClick", "{addTask}");
    btn.textContent = "Add Task";
    col.append(btn);
    document.querySelector(".column-container").append(col);
  };

  const addTask = (record) => {
    let col_id = "#col" + record.column_id;
    if (document.querySelector(col_id)) {
      let col_id = "#col" + record.column_id;
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

      document.querySelector(col_id).append(div);
    }
  };

  return (
    <>
      <div class="column-container"></div>
      <button id="addcol" onClick={addColumn}>
        <span>&#43;</span>
      </button>
    </>
  );
}
