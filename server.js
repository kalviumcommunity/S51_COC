const { startDatabase, stopDatabase, isConnected } = require('./config/db');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  })
});

app.get('/ping', (req, res) => {
  res.send('Pong')
})

app.listen(port, async () => {
  await startDatabase();
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;