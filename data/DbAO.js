const DbContext = require("./DbContext");
var User = require('../models/User');
var bcrypt = require('bcrypt');

let dbContext = new DbContext();

class DbAO{
    register(user, password) {
        return new Promise((resolve, reject) => {
            user.password = bcrypt.hashSync(password, 8);
            dbContext.Users.insert(user, (error, report) => {
                if(error) {
                    reject(error);
                }
                else
                {
                    resolve(report);
                }
            });
        });
    }

login(email, password){
    console.log(email, password);
    return new Promise((resolve, reject) => {
        this.findUserByEmail(email)
        .then((user) => {
            console.log(user);
            if(this.matchPasswords(password, user.password)){
                console.log("dun no");
                resolve(user);
            }else{
                reject();
            }
        })
        .catch((error) => {
            reject(error);
            console.log("Error with log in attempt.")
        })
    });
}

    matchPasswords(password, userPass){
        return bcrypt.compareSync(password, userPass);
    }

    findUserByEmail(email){
        return new Promise((resolve, reject) =>{
            dbContext.Users.findOne({email: email}, (err, report) => {
                if(err){
                    reject(err);
                    console.log("Database Error");
                }
                if(report == null){
                    reject(new Error('No Matching User'));
                    console.log("No matching User");
                }else{
                    console.log("Found user" + report);
                    resolve(report);
                }
            });
    });
    }
    
//retrieve all courseworks
getAllCoursework() {
    return new Promise((resolve, reject) => {
        dbContext.Coursework.find({}, function (err, coursework) {
            if (err) {
                reject(err);
                console.log('getAllCoursework Promise rejected');
            } else {
                resolve(coursework);
                console.log('getAllCoursework Promise resolved');
            }
        });
    });
}

 //insert a new coursework
 addCoursework(title, module, dueDate, compDate) {
    var entry = {
        title: title,
        module: module,
        dueDate: dueDate,
        compDate: compDate
    };

    dbContext.Coursework.insert(entry, function (err, doc) {
        if (err) {
            console.log("Error inserting document into database", title);
        } else {
            console.log('add coursework: ', title);
        }
    });
}
}
module.exports = DbAO;