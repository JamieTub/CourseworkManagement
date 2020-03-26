const Datastore = require("nedb");

var Users = new Datastore("./bin/users.db");
Users.loadDatabase();

james = {
    firstName: "James",
    lastName: "Lawn",
    email: "test1@test.com",
    password: 'testing'
  };

  class Seed{
     
    constructor(){}

    initUser(){
        Users.insert(james, function(err, User){console.log(User)})
    }

  }

  module.exports = Seed;