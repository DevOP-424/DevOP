import React from "react";
import "./board.css";

export default class Board extends React.Component {
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
