import { createContext } from "react";
import io from "socket.io-client";

const { REACT_APP_SERVER_URI } = process.env;

const socket = io(REACT_APP_SERVER_URI);
const SocketContext = createContext(socket);

socket.on("connect", () => {
  console.log("socket is connected");
});

socket.on("disconnect", () => {
  console.log("socket is connected");
});

export { socket, SocketContext };
