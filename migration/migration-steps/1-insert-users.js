
module.exports = {
    id: '1-insert-users',

    up : function(db, cb){
        db.collection('users').insert({ name: 'pizzaman' }, cb);
    },

    down : function(db, cb){
        db.collection('users').remove({ name: 'pizzaman' }, cb);
    }
}