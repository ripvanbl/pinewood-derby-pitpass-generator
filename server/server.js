var http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    apiServer = require('./api/index.js'),
    port = process.env.PORT || 8080,
    publicFolderPath;

publicFolderPath = path.resolve(__dirname, '../client/dist');
console.log('Serving static content from:', publicFolderPath);

app.use('/api', apiServer); // Mount the HTTP API on the URL space /api
app.use(express.static(publicFolderPath)); // For other requests, just serve /public

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(publicFolderPath, 'index.html'));
});

http.createServer(app).listen(port, function() {
  console.log('HTTP listening at port', port);
});
