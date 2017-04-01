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

publicFolderPath = path.resolve('./public');

app.use('/api', apiServer); // Mount the HTTP API on the URL space /api
app.use(express.static(publicFolderPath)); // For other requests, just serve /public
app.get('/*', function(req, res) {
    res.sendFile(path.resolve(publicFolderPath, 'index.html'));
});