class User {
    constructor(){
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
    }

    //can be used to display full name of user
    getName(){
        return this.foreName + " " + this.surName;
    }
}
module.exports = User;