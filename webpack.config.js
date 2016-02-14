var path = require('path')

module.exports = {
  entry: ['./client/app/app'],
  output: {
    path: path.join(__dirname, 'client', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /.*\.js$/, loaders: ['ng-annotate']},
    ]
  }
};
