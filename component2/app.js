const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading index.html");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/api") {
    const options = {
      hostname: "component1",
      port: 8000,
      path: "/",
      method: "GET",
    };

    const apiReq = http.request(options, (apiRes) => {
      let body = "";

      apiRes.on("data", (chunk) => {
        body += chunk;
      });

      apiRes.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(body);
      });
    });

    apiReq.on("error", (err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error contacting backend: " + err.message);
    });

    apiReq.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("component2 running on port 3000");
});
