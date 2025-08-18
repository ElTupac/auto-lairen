import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

import { config } from "dotenv";
config();

import { main } from "./src/main";
import { randomUUID, UUID } from "crypto";
import { Communication } from "./src/commons/communication";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({
  server,
});

const { addConnections, getConnections } = main();

const communications: {
  from: UUID;
  communication: string;
  cb: (communication: Communication) => void;
}[] = [];
let processing: boolean = false;

const processCommunication = () => {
  if (communications.length && !processing) {
    processing = true;
    const { communication, cb, from } = communications.shift();
    try {
      const parsedMessage = JSON.parse(communication) as {
        type: "setup";
        data: unknown;
      };

      if (
        parsedMessage.type === "setup" &&
        !getConnections().some(({ id }) => from === id)
      ) {
        const players = getConnections().filter(
          ({ type }) => type === "player-1" || type === "player-2"
        );
        if (players.length < 2) {
          addConnections({
            id: from,
            type: !players.length ? "player-1" : "player-2",
            onCommunication: cb,
          });
        } else {
          addConnections({
            id: from,
            type: "spectator",
            onCommunication: cb,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }

    processing = false;

    setTimeout(() => {
      processCommunication();
    }, 100);
  }
};

const handleCommunication = (
  from: UUID,
  communication: string,
  cb: (communication: Communication) => void
) => {
  communications.push({ from, communication, cb });
  if (!processing) processCommunication();
};

wss.on("connection", (ws) => {
  const connection_id = randomUUID();
  const replyHere = (communication: string) => {
    ws.send(communication);
  };

  ws.on("message", (message, isBinary) => {
    handleCommunication(
      connection_id,
      (isBinary ? message : message.toString()) as string,
      (communication: Communication) => {
        replyHere(
          JSON.stringify({
            type: communication.type,
            data: communication.data,
          })
        );
      }
    );
  });

  ws.on("close", () => {
    // TODO: handle client disconnected
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
