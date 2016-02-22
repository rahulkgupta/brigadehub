'use strict'
var db = require('./db');
exports.up = function(next) {
  db.brigadehub.insert({"Name":"testplease"})
  next();
};
exports.down = function(next) {
  db.brigadehub.remove({"Name":"test"})
  next();
};
