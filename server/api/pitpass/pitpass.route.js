'use strict';

const Pitpass = require('./pitpass');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

module.exports = {
  create: create,
  findById: findById,
  findByUserId: findByUserId,
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
    res.status(400).json({
      "status": "Error",
      "version": "0.0.1",
      "data": null,
      "message": "ERR_NO_PITPASS"
    });

    return;
  }

  const item = req.body;
  const model = new Pitpass(item);

  model.save()
    .then((doc) => {
      res.status(201)
        .set('ETag', doc._id)
        .json({
          "status": "OK",
          "version": "0.0.1",
          "data": doc
        });
    })
    .catch((err) => {
      console.info(`create pitpass error: ${err}`);

      const isValidationError = (err && err.name === 'ValidationError') ? true : false;
      const message = isValidationError ? 'ERR_PITPASS_VALIDATION_FAILED' : 'ERR_SAVE_PITPASS_FAILED';
       
      res.status(400).json({
        "status": "Error",
        "version": "0.0.1",
        "data": null,
        "message": message
      });
    });
}

/**
 * Get a pitpass by Id.
 * @module findById
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function findById(req, res) {
  if (!req.params.id) {
    res.status(400).json({
      "status": "Error",
      "version": "0.0.1",
      "data": null,
      "message": "ERR_NO_PITPASS_ID"
    });

    return;
  }

  Pitpass.findOne({
      _id: req.params.id
    })
    .then((doc) => {
      res.json({
        "status": "OK",
        "version": "0.0.1",
        "data": doc
      });
    })
    .catch((err) => {
      console.info(`find pitpass by id error: ${err}`);

      res.status(404).json({
        "status": "Warn",
        "version": "0.0.1",
        "data": null,
        "message": "PITPASS_NOT_FOUND"
      });
    });
}

/**
 * Get pitpasses for a user Id.
 * @module findByUserId
 * @param {object} req - The node request
 * @param {object} res - The node response
 */
function findByUserId(req, res) {
  if (!req.query.uid) {
    res.status(404).json({
      "status": "Error",
      "version": "0.0.1",
      "data": null,
      "message": "ERR_NO_UID"
    });

    return;
  }

  Pitpass.find({
      userid: req.query.uid
    })
    .then((doc) => {
      res.json({
        "status": "OK",
        "version": "0.0.1",
        "data": doc
      });
    })
    .catch((err) => {
      console.info(`find pitpass by user id error: ${err}`);

      res.status(404).json({
        "status": "Warn",
        "version": "0.0.1",
        "data": null,
        "message": "NO_PITPASS_FOR_USER"
      });
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
    res.status(400).json({
      "status": "Error",
      "version": "0.0.1",
      "data": null,
      "message": "ERR_NO_PITPASS_ID"
    });

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
      res.json({
        "status": "OK",
        "version": "0.0.1",
        "data": doc
      });
    })
    .catch((err) => {

      console.info(`update pitpass error: ${err}`);

      const isValidationError = (err && err.name === 'ValidationError') ? true : false;
      const message = isValidationError ? 'ERR_PITPASS_VALIDATION_FAILED' : 'ERR_SAVE_PITPASS_FAILED';

      res.status(400).json({
        "status": "Error",
        "version": "0.0.1",
        "data": null,
        "message": message
      });
    });
}