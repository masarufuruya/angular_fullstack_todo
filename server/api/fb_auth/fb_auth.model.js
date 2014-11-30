'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FbAuthSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('FbAuth', FbAuthSchema);