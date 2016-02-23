'use strict'
var db = require('./db')
exports.up = function (next) {
  // run connect promise
  db.connect().then(function (db) {
    console.log('connected')
    // set up desired collection
    var testCollection = db.collection('users')

    // run mongo call on collection
    testCollection.insertMany([{'username': 'testplease'}], function (err, result) {
      // appropriately catch insert error
      if (err) {
        console.error(err)
        throw new Error(err)
      }

      // close connection
      db.close()

      // continue migrations
      next()
    })
  })
    // Appropriately catch a connection error
    .catch(function (err, db) {
      console.error(err)
      throw new Error(err)
    })

// end of up migration
}
exports.down = function (next) {
  // run connect promise
  db.connect().then(function (db) {
    console.log('connected')
    // set up desired collection
    var testCollection = db.collection('users')

    // run mongo call on collection
    testCollection.deleteOne({'username': 'testplease'}, function (err, result) {
      // appropriately catch insert error
      if (err) {
        console.error(err)
        throw new Error(err)
      }

      // close connection
      db.close()

      // continue migrations
      next()
    })
  })
    // Appropriately catch a connection error
    .catch(function (err, db) {
      console.error(err)
      throw new Error(err)
    })

// end of down migration
}
