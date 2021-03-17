import TeamBoard from "../teamView/teamBoard"
import Chat from "../chat/chat";
import React from "react";

import './team.css'

export default class Teams extends React.Component{

    resize(e){
        var handler = document.querySelector('.handler');
        var wrapper = handler.closest('.main-content');
        var boxA = wrapper.querySelector('.box');
         // Get offset
        var containerOffsetLeft = wrapper.offsetLeft;

        // Get x-coordinate of pointer relative to container
        var pointerRelativeXpos = e.clientX - containerOffsetLeft;
        
        // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
        var boxAminWidth = 60;

        // Resize box A
        // * 8px is the left/right spacing between .handler and its inner pseudo-element
        // * Set flex-grow to 0 to prevent it from growing
        boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
        boxA.style.flexGrow = 0;
    }
    
    render(){
        return(
            <>
            <div class = "box"><TeamBoard /></div> 
            <div class="handler" draggable="true" onDrag = {this.resize.bind(this)} onDragEnd = {this.resize.bind(this)} ></div>
            <div class = "box"><Chat /></div>
            </>
        );
      }
}