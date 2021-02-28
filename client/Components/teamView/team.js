import Board from "../board/board";
import Chat from "../chat/chat";
import React from "react";
import './team.css'

export default class Teams extends React.Component{
    
    
    render(){
        return(
            <>
            <Board />
            <Chat />
            </>
        );
    }
}