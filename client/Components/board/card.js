import React from "react";

export default class card extends React.Component {


   render() {
       return(
        <>
        <div class="taskcard">
            <input type="text" class="firstlastname" placeholder="Name"></input>
            <input type="text" class="assigntask" placeholder="Task"></input>
        </div>
        </>
       );
   }
}