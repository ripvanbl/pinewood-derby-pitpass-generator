'use strict';

const config = require('./config'),
  admin = require('firebase-admin');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  initialize: initialize,
  verifyToken: verifyToken
};


////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////

/**
 * Initializes the app with Firebase.
 * @module initialize
 */
function initialize() {
  console.log(`Initializing the Firebase admin`);
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: config.firebase.databaseUrl
  });  
}

/**
 * Validates a user token with Firebase.
 * @module verifyToken
 * @param {object} token - The encrypted Firebase user token
 */
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
        resolve(decodedToken.uid);
      }).catch((error) => {
        reject(error);
      });
  });
}
