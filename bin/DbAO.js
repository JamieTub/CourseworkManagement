const DbContext = require("./DbContext");
var User = require('../models/User');
var bcrypt = require('bcrypt');

let dbContext = new DbContext();

class DbAO{
    register(user, password, callback){
        dbContext.Users.find({email: user.email}, function(err, report){
            if(Object.keys(report).length == 0){
                //hash users password
                user.password = bcrypt.hashSync(password, 6);

                //insert user to db
                dbContext.Users.insert(user, function(err, report){
                    if(err){
                        console.log("Error adding user to DB");
                    }
                    callback(report);
                });
            }
        });
        
    }
}