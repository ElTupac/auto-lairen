console.log("test");

const SOCKET_ROUTE = "ws://localhost:8000";
const socket = new WebSocket(SOCKET_ROUTE);

const handleMessage = (from, message, target = "player-1") => {
  const container = window.document.querySelector(
    `.player-interface#${target} .message-container`
  );
  const messageElement = window.document.createElement("div");
  messageElement.innerHTML = `
        <label>${from}:</label>
        <textarea readonly>${message}</textarea>
    `;

  container.append(messageElement);
};

const sendMessage = (from, message) => {
  handleMessage(from, message, from);

  socket.send(message);
};

socket.onopen = () => {
  handleMessage("System", "Connected", "player-1");
  sendMessage("player-1", "ready");
};

socket.onmessage = (event) => {
  handleMessage("Server", event, "player-1");
};
