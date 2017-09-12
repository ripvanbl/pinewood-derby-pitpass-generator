'use strict';



////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  getVersion: getVersion
};





////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////

/**
 * Gets the version of the software.
 * @module getVersion
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function getVersion(req, res) {
  res.json({
    "status": "OK",
    "version": "0.0.1"
  });
}
