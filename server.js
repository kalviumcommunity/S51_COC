const { startDatabase, stopDatabase, isConnected } = require('./config/db');
const { getRouter, deleteRouter, postRouter, patchRouter, loginRouter, router } = require('./routes/routes');
const express = require('express');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api", getRouter);
app.use("/api", postRouter);
app.use("/api", patchRouter);
app.use("/api", deleteRouter);
app.use("/api", loginRouter);
app.use("/api", router)
app.use(cors())

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
