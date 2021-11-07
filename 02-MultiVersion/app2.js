var http = require("http");

var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello Monde avec la version " + process.version + "\n");
});

server.listen(8000);

console.log("Server running at 0.0.0.0:8000");
