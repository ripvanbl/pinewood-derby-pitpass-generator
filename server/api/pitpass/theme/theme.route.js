'use strict';

const Theme = require('./theme');
const PPGResponse = require('../../ppg-response');
const PPGResponseStatus = require('../../ppg-response-status');
const messages = {
  ERR_NO_THEME: 'ERR_NO_THEME',
  ERR_NO_THEME_ID: 'ERR_NO_THEME_ID',
  ERR_THEME_VALIDATION_FAILED: 'ERR_THEME_VALIDATION_FAILED',
  ERR_SAVE_THEME_FAILED: 'ERR_SAVE_THEME_FAILED',
  ERR_NO_THEME_ID: 'ERR_NO_THEME_ID',
  ERR_NO_QUERY: 'ERR_NO_QUERY',
  THEME_NOT_FOUND: 'THEME_NOT_FOUND',
  NO_THEMES_QUERY_MATCH: 'NO_THEMES_QUERY_MATCH'
};

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

/**
 * Route definitions for managing pitpass themes
 * @module PitpassThemeRouter
 */
module.exports = {
  create: create,
  getById: getById,
  find: find,
  update: update
};





////////////////////////////////////////////////////////////
// Pitpass Theme Executors
////////////////////////////////////////////////////////////


/**
 * Create a pitpass theme.
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function create(req, res) {
  const item = req.body;

  if (!item) {
    res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, data, messages.ERR_NO_THEME));
    return;
  }

  const model = new Theme(item);

  model.uid = req.uid;

  model.save()
    .then((doc) => {
      res.status(201)
        .set('ETag', doc._id)
        .json(new PPGResponse(PPGResponseStatus.OK, doc));
    })
    .catch((err) => {
      console.info(`create theme error: ${err}`);

      const isValidationError = (err && err.name === 'ValidationError') ? true : false;
      const message = isValidationError ? messages.ERR_THEME_VALIDATION_FAILED : messages.ERR_SAVE_THEME_FAILED;

      res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, message));
    });
}

/**
 * Get a pitpass theme by Id.
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function getById(req, res) {
  if (!req.params.id) {
    res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_NO_THEME_ID));
    return;
  }

  try {
    Theme.findOne({
        _id: req.params.id
      })
      .then((doc) => {
        res.json(new PPGResponse(PPGResponseStatus.OK, doc));
      })
      .catch((err) => {
        console.info(`get theme by id error: ${err}`);
        res.status(404).json(new PPGResponse(PPGResponseStatus.WARN, null, messages.THEME_NOT_FOUND));
      });
  } catch (err) {
    console.warn(`get theme by id findOne: ${err}`);
    res.status(404).json(new PPGResponse(PPGResponseStatus.WARN, null, messages.THEME_NOT_FOUND));
  }
}

/**
 * Find pitpass themes
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function find(req, res) {
  try {
    Theme.apiQuery(req.query)
      .exec()
      .then((doc) => {
        res.json(new PPGResponse(PPGResponseStatus.OK, doc));
      })
      .catch((err) => {
        console.info(`find themes error: ${err}`);
        res.status(404).json(new PPGResponse(PPGResponseStatus.WARN, null, messages.NO_THEMES_QUERY_MATCH));
      });
  } catch (err) {
    console.warn(`find themes apiQuery: ${err}`);
    res.status(404).json(new PPGResponse(PPGResponseStatus.WARN, null, messages.NO_THEMES_QUERY_MATCH));
  }
}

/**
 * Update a pitpass theme.
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function update(req, res) {
  const item = req.body;

  if (!item || !item._id) {
    res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, messages.ERR_NO_THEME_ID));
    return;
  }

  Theme.findById(item._id)
    .then((model) => {
      if (!model) {
        throw new Error(`Invalid Theme Id ${item.id}`);
      }

      Object.assign(model, item);

      return model;
    })
    .then((model) => {
      return model.save();
    })
    .then((doc) => {
      res.json(new PPGResponse(PPGResponseStatus.OK, doc));
    })
    .catch((err) => {
      console.info(`update theme error: ${err}`);

      const isValidationError = (err && err.name === 'ValidationError') ? true : false;
      const message = isValidationError ? messages.ERR_THEME_VALIDATION_FAILED : messages.ERR_SAVE_THEME_FAILED;

      res.status(400).json(new PPGResponse(PPGResponseStatus.ERROR, null, message));
    });
}