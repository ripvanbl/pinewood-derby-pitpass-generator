'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../auth');
const config = require('../config');
const version = require('./version');
const pitpass = require('./pitpass/pitpass.route');
const theme = require('./pitpass/theme/theme.route');
const PPGResponse = require('./ppg-response');
const PPGResponseStatus = require('./ppg-response-status');
const messages = {
  ERR_NO_AUTH_TOKEN: 'ERR_NO_AUTH_TOKEN',
  ERR_AUTH_INVALID_USER: 'ERR_AUTH_INVALID_USER'
};

_initialize();
module.exports = router;

/**
 * Initializes and secures the routes (order is important)
 */
function _initialize() {
  // Initialize the authorization handler
  auth.initialize();

  
  ////////////////////////////////////////////////////////////
  // Unauthenticated routes
  ////////////////////////////////////////////////////////////

  router.get('/version', version.getVersion);



  // Secure any routes below this by checking for the proper authorization
  router.use((req, res, next) => {
    // ... except if this is development mode and a request from postman
    if (config.env === 'development' && req.headers['x-app-id'] === 'postman') {
      req.uid = 'development';
      return next(); 
    }

    if (!req.headers.authorization || req.headers.authorization.length < 8) {
      return res.status(401).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_NO_AUTH_TOKEN));
    }

    const token = req.headers.authorization.substr(7);
    
    auth.verifyToken(token)
      .then((uid) => {
        req.uid = uid;
        next();
      })
      .catch((error) => {
        console.log(`User Auth ${error}`);
        res.status(403).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_AUTH_INVALID_USER));
      });
  })  


  ////////////////////////////////////////////////////////////
  // Pitpass Theme Routes
  ////////////////////////////////////////////////////////////
  
  router.post('/pitpass/theme', theme.create);
  router.put('/pitpass/theme', theme.update);
  router.get('/pitpass/theme/:id', theme.getById);
  router.get('/pitpass/theme', theme.find);


  ////////////////////////////////////////////////////////////
  // Pitpass Routes
  ////////////////////////////////////////////////////////////
  
  router.post('/pitpass', pitpass.create);
  router.put('/pitpass', pitpass.update);
  router.get('/pitpass/:id', pitpass.getById);
  router.get('/pitpass', pitpass.find);
}
