import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

import { config } from "dotenv";
config();

import { main } from "./src/main";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({
  server,
});

const { addConnections, connections, startMatch } = main();

wss.on("connection", (ws) => {
  ws.on("message", (message, isBinary) => {
    console.log(isBinary ? message : message.toString());
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.get("/status", (req, res) => {
  res.send("server is up");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
