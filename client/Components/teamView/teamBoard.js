import React, { useRef, useContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { SettingsContext } from "../../SettingsContext";
import "../board/board.css";

export default function teamBoard() {
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
    let col_id = "col" + record.column_id;
    col.setAttribute("id", col_id);
    let form = document.createElement("form");
    form.setAttribute("class", "columnNameForm");
    form.setAttribute("id", "form-" + col_id);
    let txt = document.createElement("input");
    txt.setAttribute("class", "columnNameInput");
    txt.setAttribute("type", "text");
    txt.setAttribute("placeholder", record.column_name);
    let subBtn = document.createElement("button");
    subBtn.setAttribute("class", "hideme");
    subBtn.textContent = "Save";
    form.append(txt);
    form.append(subBtn);
    col.append(form);
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
        "<h2>" +
        record.task_name +
        "</h2><h4>" +
        record.description +
        "</h4><h5>TASK00000" +
        record.task_id +
        "</h5>";

      document.querySelector(col_id).append(div);
    }
  };

  const updateColumnName = (e) => {
    console.log(e);
    e.preventDefault();
    let colParent = document.querySelector(".column").closest(".near.ancestor");
    console.log(colParent);
    colParent = colParent.id.slice(3, 4);
    console.log(colParent);
    colRecord = {
      column_id: colParent,
      column_name: e.target.value,
    };
    console.log(colRecord);
    socketRef.current.emit("column_update", colRecord);
    console.log(socketRef.current);
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
