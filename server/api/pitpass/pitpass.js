'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const mongooseTimestamp = require('mongoose-timestamp');

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

const RacerSchema = new mongoose.Schema({
  _id: false,
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  carname: {
    type: String,
    required: false,
    trim: true
  },
  rank: {
    type: String,
    required: false,
    enum: ['Tiger', 'Wolf', 'Bear', 'Webelos', 'Arrow of Light']
  },
  profilePhotoDataURL: {
    type: String,
    required: false,
    trim: true,
    default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
});

const PitpassSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      trim: true
    },
    racer: {
      type: RacerSchema,
      required: true
    }
  }
);

PitpassSchema.plugin(mongooseTimestamp);
PitpassSchema.plugin(mongooseStringQuery);

const Pitpass = mongoose.model('Pitpass', PitpassSchema);

/**
 * Returns the model for a pitpass.
 */

module.exports = Pitpass;
