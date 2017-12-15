const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express(),
    db = require('./db');
    apiServer = require('./api/index.js'),
    config = require('./config');

app.use(bodyParser.json());
app.use('/api', apiServer); // Mount the HTTP API on the URL space /api
app.use(express.static(config.staticFiles)); // For other requests, just serve from the static files location

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(config.staticFiles, 'index.html'));
});

http.createServer(app).listen(config.port, () => {
  console.log(`Server listening at port ${config.port}`);

  // Establish connection to database
  db.connect();

  // Disconnect on shutdown
  process.on('SIGINT', () => {
    console.log(`\nClosing database connection...`);
    db.disconnect();
    process.exit(0);
  });
});
