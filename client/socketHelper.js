import socketIOClient from "socket.io-client";

let socket = socketIOClient("http://localhost:22446");

export { socket };
