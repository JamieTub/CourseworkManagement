const Datastore = require("nedb");

var dbCoursework = new Datastore("./bin/coursework.db");
dbCoursework.loadDatabase();

class Coursework {
    constructor(dbFilePath){
        this.title = "";
        this.module = "";
        this.dueDate = new Date();
        this.compDate = new Date();

        if (dbFilePath) {
            //embedded
            this.dbCoursework = new Datastore({ filename: dbFilePath, autoload: true });
        } else {
            //in memory 
            this.dbCoursework = new Datastore();
        }
    }

    // method to initialise the db
    init() {
        this.dbCoursework.insert({
            title: 'WPD2', 
            module: 'WPD2 Module Description', 
            dueDate: '02/02/2020', 
            compDate: '29/01/2020'

        }, function (err, doc) {
            if (err) {
                console.log('Error inserting the coursework into the database', err);
            } else {
                console.log('coursework inserted into database');
            }
        });
    };
     
    //retrieve all courseworks
     getAllCoursework() {
        return new Promise((resolve, reject) => {
            this.dbCoursework.find({}, function (err, coursework) {
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

        this.dbCoursework.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document into database", title);
            } else {
                console.log('add coursework: ', title);
            }
        });
    }
}
module.exports = Coursework;