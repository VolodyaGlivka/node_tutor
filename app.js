const http = require('http');

const serverListener = (request, responce) => {
  const uri = request.url;
};

const server = http.createServer(serverListener);

// start to listen server
server.listen(8000);
