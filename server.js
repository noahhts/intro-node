import http from "node:http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello there");
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});

// TODO don't need this file, delete it
