'use strict';

var path = require('path');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  staticFiles: path.resolve(__dirname, '../client/dist'),
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1/pitpass'
  }
};
