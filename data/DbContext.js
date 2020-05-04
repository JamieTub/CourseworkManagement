const Datastore = require('nedb');

class DbContext {
    Users = {};

    constructor(){
        this.Users = new Datastore("./bin/users.db");
        this.Coursework = new Datastore("./bin/coursework.db");

        this.Users.loadDatabase();
        this.Coursework.loadDatabase();
    }
}
module.exports = DbContext;