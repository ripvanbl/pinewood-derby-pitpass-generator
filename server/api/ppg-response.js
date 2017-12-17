'use strict';

/**
 * Standard response payload from this service
 */
module.exports = class PPGResponse {
  constructor(status, data, message) {
    this.version = '0.0.1';
    this.status = status || '';
    this.message = message || '';
    this.data = data || null;
  }
}
