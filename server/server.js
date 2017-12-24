const path = require('path');

// Bring in any locally declared environment variables
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env')});

const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    db = require('./db'),
    apiServer = require('./api/index.js'),
    config = require('./config');

app.use(bodyParser.json({limit: config.bodyLimitSize}));
app.use('/api', apiServer); // Mount the HTTP API on the URL /api
app.use(express.static(config.staticFiles)); // For other requests, just serve from the static files location

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(config.staticFiles, 'index.html'));
});

http.createServer(app).listen(config.port, () => {
  console.log(`Server listening at port ${config.port}`);

  // Establish a connection to the database
  db.connect();

  // Disconnect on shutdown
  process.on('SIGINT', () => {
    console.log(`\nClosing database connection...`);
    db.disconnect();
    process.exit(0);
  });
});
