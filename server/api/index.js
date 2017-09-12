'use strict';

var express = require('express');
var router = express.Router();
var version = require('./version');

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////


/**
 * Returns the version of the software.
 */
router.get('/version', version.getVersion);


module.exports = router;
