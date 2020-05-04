const Datastore = require("nedb");

var Users = new Datastore("./bin/users.db");
var Coursework = new Datastore("./bin/coursework.db");

Users.loadDatabase();
Coursework.loadDatabase();

james = {
    firstName: "James",
    lastName: "Lawn",
    email: "test1@test.com",
    password: 'testing'
  };

web2 = {
  title: "Web Platform Development 2",
  module:  "",
  dueDate: 06/05/2020,
  compDate: 05/05/2020
}

  class Seed{
     
    constructor(){}

    initUser(){
      Users.insert(james, function(err, User){console.log(User)})
    }
    initCoursework(){
      Coursework.insert(web2, function(err, work){console.log(work)})
    }

  }
  module.exports = Seed;