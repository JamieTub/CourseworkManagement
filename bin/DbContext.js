const Datastore = require('nedb');

class DBContext {
    Users = {};

    constructor(){
        this.Users = new Datastore("./bin/users.db");

        this.Users.loadDatabase();
    }
}
module.exports = DbContext;