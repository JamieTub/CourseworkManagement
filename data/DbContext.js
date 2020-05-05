const Datastore = require('nedb');

class DbContext {
    Users = {};
    Coursework = {};

    constructor(){
        this.Users = new Datastore('./bin/users.db');
        this.Coursework = new Datastore('./bin/coursework.db');

        this.Users.loadDatabase(function (err) {
            });
        this.Coursework.loadDatabase(function (err) {
            });
    }
}
module.exports = DbContext;