import app from "./app";
import http from "http";

const server = http.createServer(app);

server.listen(process.env.PORT || 5000);
server.on("listening", onListening);
server.on("error", (err) => {
  console.log(err.message);
});

function onListening() {
  const addr = server.address();
  console.log(
    `Listening on http://localhost:${typeof addr === "string" ? addr : addr?.port
    }`
  );
}
