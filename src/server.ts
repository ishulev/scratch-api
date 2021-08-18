import * as http from "http";
import { handleRequest } from "./controller";

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/clinics") && req.method === "GET") {
    //response headers
    res.writeHead(200, { "Content-Type": "application/json" });
    //end the response
    res.end(JSON.stringify(handleRequest(req.url)));
  }

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

export default server;
