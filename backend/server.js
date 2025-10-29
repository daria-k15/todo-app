require('dotenv').config();
const app = require('./src/app').default;

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server');
  server.close(() => {
    console.log('Server closed');
  });
});

module.exports = server;
