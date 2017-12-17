'use strict';

const express = require('express');
const router = express.Router();
const version = require('./version');
const pitpass = require('./pitpass/pitpass.route');

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////


/**
 * Returns the version of the software.
 */
router.get('/version', version.getVersion);

/**
 * Creates a pitpass
 */
router.post('/pitpass', pitpass.create);

/**
 * Updates a pitpass
 */
router.put('/pitpass', pitpass.update);

/**
 * Get a specific pitpass.
 */
router.get('/pitpass/:id', pitpass.getById);

/**
 * Find pitpasses by querystring params.
 */
router.get('/pitpass', pitpass.find);


module.exports = router;
