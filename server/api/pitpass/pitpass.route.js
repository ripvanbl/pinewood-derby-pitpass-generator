'use strict';

const Pitpass = require('./pitpass');
const PPGResponse = require('../ppg-response');
const PPGResponseStatus = require('../ppg-response-status');
const messages = {
  ERR_NO_PITPASS: 'ERR_NO_PITPASS',
  ERR_NO_PITPASS_ID: 'ERR_NO_PITPASS_ID',
  ERR_PITPASS_VALIDATION_FAILED: 'ERR_PITPASS_VALIDATION_FAILED',
  ERR_SAVE_PITPASS_FAILED: 'ERR_SAVE_PITPASS_FAILED',
  ERR_NO_PITPASS_ID: 'ERR_NO_PITPASS_ID',
  ERR_NO_QUERY: 'ERR_NO_QUERY',
  PITPASS_NOT_FOUND: 'PITPASS_NOT_FOUND',
  NO_PITPASS_QUERY_MATCH: 'NO_PITPASS_QUERY_MATCH'
};

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  create: create,
  getById: getById,
  find: find,
  update: update
};





////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////

/**
 * Create a pitpass.
 * @module create
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function create(req, res) {
  if (!req.body) {
    res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, data, messages.ERR_NO_PITPASS));
    return;
  }

  const item = req.body;
  const model = new Pitpass(item);

  model.save()
    .then((doc) => {
      res.status(201)
        .set('ETag', doc._id)
        .json(new PPGResponse(PPGResponseStatus.OK, doc));
    })
    .catch((err) => {
      console.info(`create pitpass error: ${err}`);

      const isValidationError = (err && err.name === 'ValidationError') ? true : false;
      const message = isValidationError ? messages.ERR_PITPASS_VALIDATION_FAILED : messages.ERR_SAVE_PITPASS_FAILED;
       
      res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, message));
    });
}

/**
 * Get a pitpass by Id.
 * @module getById
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function getById(req, res) {
  if (!req.params.id) {
    res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_NO_PITPASS_ID));
    return;
  }

  Pitpass.findOne({
      _id: req.params.id
    })
    .then((doc) => {
      res.json(new PPGResponse(PPGResponseStatus.OK, doc));
    })
    .catch((err) => {
      console.info(`get pitpass by id error: ${err}`);
      res.status(404).json(new PPGResponse(PPGResponseStatus.WARN, null, messages.PITPASS_NOT_FOUND));
    });
}

/**
 * Find pitpasses
 * @module find
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function find(req, res) {
  if (!req.query) {
    res.status(404).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_NO_QUERY));
    return;
  }

  Pitpass.apiQuery(req.query)
    .exec()
    .then((doc) => {
      res.json(new PPGResponse(PPGResponseStatus.OK, doc));
    })
    .catch((err) => {
      console.info(`find pitpass error: ${err}`);
      res.status(404).json(new PPGResponse(PPGResponseStatus.WARN, null, messages.NO_PITPASS_QUERY_MATCH));
    });
}

/**
 * Update a pitpass.
 * @module update
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function update(req, res) {
  if (!req.body || !req.body._id) {
    res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_NO_PITPASS_ID));
    return;
  }

  const item = req.body;

  Pitpass.findById(item._id)
    .then((model) => {
      return Object.assign(model, {
        firstname: item.firstname,
        lastname: item.lastname,
        carname: item.carname,
        rank: item.rank,
        profilePhotoDataURL: item.profilePhotoDataURL
      });
    })
    .then((model) => {
      return model.save();
    })
    .then((doc) => {
      res.json(new PPGResponse(PPGResponseStatus.OK, doc));
    })
    .catch((err) => {
      console.info(`update pitpass error: ${err}`);

      const isValidationError = (err && err.name === 'ValidationError') ? true : false;
      const message = isValidationError ? messages.ERR_PITPASS_VALIDATION_FAILED : messages.ERR_SAVE_PITPASS_FAILED;

      res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, message));
    });
}