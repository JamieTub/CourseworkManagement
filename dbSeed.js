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
    constructor(dbFilePath) {
      //run database as a file
      if (dbFilePath) {
          this.db = new Datastore({ filename: dbFilePath, autoload: true });
          console.log("DB connected to file: ", dbFilePath);
      } else {
          //in memory 
          this.db = new Datastore();
      }
  }


    initUser(){
        Users.insert(james, function(err, User){console.log(User)})
    }
    
    all() {
      return new Promise((resolve, reject) => {
          this.db.find({}, function(err, entries) {
              if (err) {
                  reject(err);
                  console.log('rejected');
              } else {
                  resolve(entries);
                  console.log('resolved');
              }

          });
      })
    }
  

   create(Title, Module, DueDate, CompDate) {
      var entry = {
        Title: Title,
        Module: Module,
        DueDate: DueDate,
        CompDate: CompDate
      };

      this.db.insert(entry, function(err, doc) {
        if(err) {
          console.log("Can't insert entry title.: ", Title);
        }
      });
   }

    init() {
      this.db.insert({
        Title: 'Chemistry',
        Module: 'Chemistry PT',
        DueDate: '07/08/2020',
        CompDate: '05/04/2020'
      });

      this.db.insert({
        Title: 'History',
        Module: 'History 1912 WWI',
        DueDate: '07/04/2020',
        CompDate: '05/04/2020'
      });

      this.db.insert({
        Title: 'Physics',
        Module: 'Physics LG',
        DueDate: '07/06/2020',
        CompDate: '10/06/2020'
      });

      this.db.insert({
        Title: 'Mathematics',
        Module: 'Mathematics QE',
        DueDate: '06/06/2020',
        CompDate: '02/03/2020'
      });

      this.db.insert({
        Title: 'Gym',
        Module: 'GYM LDR',
        DueDate: '02/05/2020',
        CompDate: '02/05/2020'
      });
  }
}
  module.exports = Seed;