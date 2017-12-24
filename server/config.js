'use strict';

var path = require('path');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  staticFiles: path.resolve(__dirname, '../client/dist'),
  bodyLimitSize: '1mb',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1/pitpass'
  },
  firebase: {
    auth_uri: process.env.FIREBASE_AUTH_URI || '',
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_X509_CERT_URL || '',
    client_email: process.env.FIREBASE_CLIENT_EMAIL || '',
    client_id: process.env.FIREBASE_CLIENT_ID || '',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || '',
    databaseUrl: process.env.FIREBASE_DATABASE_URL || '',
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') || '',
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '',
    project_id: process.env.FIREBASE_PROJECT_ID || '',
    token_uri: process.env.FIREBASE_TOKEN_URI || '',
    type: process.env.FIREBASE_TYPE || ''
  }
};
