const http = require('http');
const ws = require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

let server; // declare server as a global variable



http.createServer((req, res) => {
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
}).listen(8083, () => {
  server = server;
  console.log('Server is listening on port 8083');
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50);

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
