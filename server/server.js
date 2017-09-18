var http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    apiServer = require('./api/index.js'),
    port = process.env.PORT || 4100,
    host = process.env.IP || '127.0.0.1',
    publicFolderPath;

http.createServer(app).listen(port, host);
console.log('HTTP listening at ' + host + ' on port ' + port);

publicFolderPath = path.resolve(__dirname, '../client/dist');

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.use('/api', apiServer); // Mount the HTTP API on the URL space /api
app.use(express.static(publicFolderPath)); // For other requests, just serve /public
app.get('/*', function(req, res) {
    res.sendFile(path.resolve(publicFolderPath, 'index.html'));
});