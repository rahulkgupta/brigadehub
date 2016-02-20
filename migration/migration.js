var Migration = require('mongration').Migration;
var path = require('path');

var config = {
   hosts: 'localhost:5465',
   db: 'brigadehub',
   migrationCollection: 'users'
}

var migration = new Migration(config);

migration.add([
  path.join(__dirname, './migration-steps/1-insert-users.js')
]);


migration.migrate(function(err, results){
    console.log(err, results);
});