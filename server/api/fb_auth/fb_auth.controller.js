'use strict';

var _ = require('lodash');
var FbAuth = require('./fb_auth.model');

// Get list of fb_auths
exports.index = function(req, res) {
  FbAuth.find(function (err, fb_auths) {
    if(err) { return handleError(res, err); }
    return res.json(200, fb_auths);
  });
};

// Get a single fb_auth
exports.show = function(req, res) {
  FbAuth.findById(req.params.id, function (err, fb_auth) {
    if(err) { return handleError(res, err); }
    if(!fb_auth) { return res.send(404); }
    return res.json(fb_auth);
  });
};

// Creates a new fb_auth in the DB.
exports.create = function(req, res) {
  FbAuth.create(req.body, function(err, fb_auth) {
    if(err) { return handleError(res, err); }
    return res.json(201, fb_auth);
  });
};

// Updates an existing fb_auth in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FbAuth.findById(req.params.id, function (err, fb_auth) {
    if (err) { return handleError(res, err); }
    if(!fb_auth) { return res.send(404); }
    var updated = _.merge(fb_auth, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, fb_auth);
    });
  });
};

// Deletes a fb_auth from the DB.
exports.destroy = function(req, res) {
  FbAuth.findById(req.params.id, function (err, fb_auth) {
    if(err) { return handleError(res, err); }
    if(!fb_auth) { return res.send(404); }
    fb_auth.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}