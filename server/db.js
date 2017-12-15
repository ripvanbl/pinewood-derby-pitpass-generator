'use strict';

const config = require('./config'),
  mongoose = require('mongoose');

let db = null;

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  connect: connect,
  disconnect: disconnect
};


////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////

/**
 * Opens a connection to the database.
 * @module connect
 */
function connect() {
  // check if already assigned
  if (db) return;

  // establish connection to mongodb
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, {
    useMongoClient: true
  });

  db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    console.log(`Database connection complete.`);
  });
}

/**
 * Closes a connection to the database.
 * @module disconnect
 */
function disconnect() {
  mongoose.disconnect((err) => {
    if (!err) {
      db = null;
      console.log(`Database connection closed`);
    } else {
      console.log(`Error closing database connection: ${err}`);
    }
  });
}