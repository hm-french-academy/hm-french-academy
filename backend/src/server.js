const http = require('http');
const routes = require('./routes');
const routeExecutor = require('./routes/routeExecutor');
const environment = require('./config/environment');
const requestMiddleware = require('./middleware/requestMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const { logInfo, logError } = require('./utils/logger');

const server = http.createServer((req, res) => {
  requestMiddleware(req, res, () => {
    authMiddleware(req, res, () => {
      try {
        res.setHeader('Content-Type', 'application/json');

        if (req.url === '/api') {
          res.writeHead(200);
          return res.end(JSON.stringify({
            name: 'HM Academy API',
            status: 'running',
            environment: environment.environment,
            version: '1.0.0',
            routes
          }));
        }

        const resource = req.url.split('/')[2];
        if (resource && routeExecutor[resource]) {
          res.writeHead(200);
          return res.end(JSON.stringify({
            resource,
            available: true,
            message: 'Handler connected'
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
});

server.listen(environment.port, () => {
  logInfo(`HM Academy API running on ${environment.port}`);
});
