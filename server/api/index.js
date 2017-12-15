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
 * Find a pitpass by id.
 */
router.get('/pitpass/:id', pitpass.findById);

/**
 * Find pitpasses by user id.
 */
router.get('/pitpass', pitpass.findByUserId);


module.exports = router;
