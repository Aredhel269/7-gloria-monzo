import io from "socket.io-client";

const socketClient = io("http://localhost:3000", {
  reconnectionAttempts: 3,
  timeout: 20000,
});

socketClient.on("connect", () => {
  console.log("Connected to server");
});

socketClient.on("message", (message) => {
  console.log("New message:", message);
});

socketClient.on("disconnect", () => {
  console.log("Disconnected from server");
});

export default socketClient;