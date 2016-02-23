var fs = require('fs')
var path = require('path')
var dotenv = require('dotenv')
var MongoDB = require('mongodb').MongoClient

// Grab .env variables
try {
  var envFilePath = path.resolve(__dirname, '../.env')
  var stats = fs.lstatSync(envFilePath)
  if (stats.isFile()) {
    dotenv.load({ path: envFilePath })
  } else {
    throw new Error('.env is not a file!')
  }
} catch (e) {
  console.warn(e)
  console.warn('.env file not found. Defaulting to sample. Please copy .env.example to .env and populate with your own credentials.')
  dotenv.load({ path: envFilePath+'.example' })
}

// Set up a central connection promise
var mongoConnect = function mongoConnectDB(){
  return new Promise(function(resolve, reject){
    var url = process.env.MONGODB;
    // Use connect method to connect to the Server
    MongoDB.connect(url, function(err, db) {
      if(err) {
        console.error(err)
        return reject(err, db)
      }
      console.log("Connected to MongoDB database:", url);
      resolve(db)
    });
  })
}

module.exports = {
  // allow for more db actions
  connect:mongoConnect
}
