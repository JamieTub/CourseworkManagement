const DbContext = require("./DbContext");
var User = require('../models/User');
var bcrypt = require('bcrypt');

let dbContext = new DbContext();

class DbAO{
    register(user, password, callback){
        dbContext.Users.find({email: user.email}, function(err, report){
            if(Object.keys(report).length == 0){
                //hash users password
                user.password = bcrypt.hashSync(password, 8);

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

    login(email, password){
        return new Promise((resolve, reject) => {
            this.findUserByEmail(email)
            .then((user) => {
                if(user.matchPasswords(password)){
                    resolve(user);
                }else{
                    reject(new Error());
                }
            })
            .catch((error) => {
                reject(new Error(error));
                console.log("Error with log in attempt.")
            })
        });
    }

    matchPasswords(password){
        return bcrypt.compareSync(password, this.user.password);
    }

    findUserByEmail(){
        return new Promise((resolve, reject) =>{
            this.Users.findOne({email: email}, (err, report) => {
                if(err){
                    reject(err);
                    console.log("Database Error");
                }
                if(report == null){
                    reject(new Error('No Matching User'));
                    console.log("No matching User");
                }else{
                    console.log("Found user" + report);

                    var User = new User();
                    user._id = report._id;
                    user.firstName = report.firstName;
                    user.lastName = report.lastName;
                    user.email = report.email;
                    user.password = report.password;

                    resolve(user);
                }
            });
    });
}
}
module.exports = DbAO;