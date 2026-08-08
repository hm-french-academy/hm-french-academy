const http = require('http');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      name: 'HM Academy API',
      status: 'running',
      version: '1.0.0',
      routes
    }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`HM Academy API running on ${PORT}`);
});
