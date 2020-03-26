class DAO {
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
}
module.exports = DAO;