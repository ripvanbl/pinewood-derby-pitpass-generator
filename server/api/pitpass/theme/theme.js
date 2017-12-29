'use strict';

const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const mongooseTimestamp = require('mongoose-timestamp');

////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////

const ThemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  component: {
    type: String,
    required: true,
    trim: true
  },
  iconDataURL: {
    type: String,
    required: false,
    trim: true,
    default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
});

ThemeSchema.plugin(mongooseTimestamp);
ThemeSchema.plugin(mongooseStringQuery);

const Theme = mongoose.model('Theme', ThemeSchema);

/**
 * Returns the model for a pitpass theme.
 */

module.exports = Theme;
