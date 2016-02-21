'use strict'
var db =require('./data/db')
exports.up = function(next) {
  db.insert({"Name":"test"})
  next();
};

exports.down = function(next) {
  db.remove({"Name":"test"})
  next();
};
