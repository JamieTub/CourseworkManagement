var User = require('../models/User');
var bcrypt = require('bcrypt');
const Datastore = require('nedb');

class DbAO{

    constructor() {
        this.Users = new Datastore("./bin/users.db");
        this.Coursework = new Datastore("./bin/coursework.db");
    }

    init() {
        this.Users.loadDatabase(function (err) {
        if (err) {
            console.log("Users finished", err);
        }
        });
        this.Coursework.loadDatabase(function (err) {
            if (err) {
                console.log("Projects finished", err);
            }
        });
    }

    register(user, password) {
        return new Promise((resolve, reject) => {
            user.password = bcrypt.hashSync(password, 8);
            this.Users.insert(user, (error, report) => {
                console.log(report);
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
                    resolve(report);
                }
            });
    });
    }
    
//retrieve all courseworks
getAllCoursework(userId) {
    console.log(userId);
    return new Promise((resolve, reject) => {
        this.Coursework.find({userId: userId}, function (err, coursework) {
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
 addCoursework(title, module, dueDate, compDate, userId) {
    var entry = {
        title: title,
        module: module,
        dueDate: dueDate,
        compDate: compDate,
        userId: userId
    };
    console.log(entry);
    this.Coursework.insert(entry, function (err, doc) {
        if (err) {
            console.log("Error inserting document into database", title);
        } else {
            console.log('add coursework: ', title);
        }
    });
}

deleteCoursework(courseworkId){
    this.Coursework.remove({_id: courseworkId}, {});
}

}
module.exports = new DbAO();