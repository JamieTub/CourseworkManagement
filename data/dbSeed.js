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

  //   init() {
  //     this.Users.loadDatabase(function (err) {
  //      // Callback is optional
  //      // Now commands will be executed
  //      console.log("finished", err);
  //      if (err) {
  //          console.log("Users finished", err);
  //      }
  //      });
  //      this.Projects.loadDatabase(function (err) {
  //          // Callback is optional
  //          // Now commands will be executed
  //          console.log("finished", err);
  //          if (err) {
  //              console.log("Projects finished", err);
  //          }
  //        });
  //      this.Milestones.loadDatabase(function (err) {
  //          // Callback is optional
  //          // Now commands will be executed
  //          console.log("finished", err);
  //          if (err) {
  //              console.log("Milestones finished", err);
  //          }
  //        });
  //      this.Categories.loadDatabase(function (err) {
  //          // Callback is optional
  //          // Now commands will be executed
  //          console.log("finished", err);
  //          if (err) {
  //              console.log("Categories finished", err);
  //          }
  //        });
  //  }

    initUser(){
        Users.insert(james, function(err, User){console.log(User)})
    }

  }
  module.exports = Seed;