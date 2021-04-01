import React from "react";
import "./board.css";

export default function Card(card) {
  return (
    <div class="taskcard" draggable="true">
      <h2>{card.card.task_name}</h2>
      <h4>{card.card.description}</h4>
      <h5>TASK00000{card.task_id}</h5>
    </div>
  );
}
