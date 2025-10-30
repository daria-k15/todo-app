import dotenv from 'dotenv';
import app from './src/app.js';

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}/api-docs`);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Closing server');
  server.close(() => {
    console.log('Server closed');
  });
});

export default server;
