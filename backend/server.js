require('dotenv').config();
const app = require('./src/app').default;

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM получен. Закрытие сервера...');
  server.close(() => {
    console.log('Сервер закрыт');
  });
});

module.exports = server;
