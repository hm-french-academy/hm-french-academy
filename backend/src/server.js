const http = require('http');
const routes = require('./routes');
const environment = require('./config/environment');
const requestMiddleware = require('./middleware/requestMiddleware');
const { logInfo, logError } = require('./utils/logger');

const server = http.createServer((req, res) => {
  requestMiddleware(req, res, () => {
    try {
      res.setHeader('Content-Type', 'application/json');

      if (req.url === '/api') {
        res.writeHead(200);
        logInfo('API health check', { time: req.requestTime });
        return res.end(JSON.stringify({
          name: 'HM Academy API',
          status: 'running',
          environment: environment.environment,
          version: '1.0.0',
          routes
        }));
      }

      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
    } catch (error) {
      logError('Server error', error);
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  });
});

server.listen(environment.port, () => {
  logInfo(`HM Academy API running on ${environment.port}`);
});
