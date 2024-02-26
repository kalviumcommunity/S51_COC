const { startDatabase, stopDatabase, isConnected } = require('./config/db');
const { getRouter, deleteRouter, postRouter, patchRouter } = require('./routes/routes');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api", getRouter);
app.use("/api", postRouter);
app.use("/api", patchRouter);
app.use("/api", deleteRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  });
});

app.get('/ping', (req, res) => {
  res.send('Pong');
});

app.listen(port, async () => {
  await startDatabase();
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = app;