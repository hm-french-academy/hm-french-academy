const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    name: 'HM Academy API',
    status: 'running',
    version: '1.0.0'
  }));
});

server.listen(PORT, () => {
  console.log(`HM Academy API running on ${PORT}`);
});
