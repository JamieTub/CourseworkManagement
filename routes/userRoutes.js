var express = require('express');
var User = require("../models/User");
var Coursework = require("../models/Coursework");
var Database = require("../data/DbAO");
var jwt = require('jsonwebtoken');
var config = require('../config');
let cDAO = new Coursework();
cDAO.init();

var router = express.Router();
var db = new Database();

//homepage
router.get('/', function(req, res){
    res.render('home', {});
}); 



//registration
router.post('/register',
    function(req, res){
    var user = new User();
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    console.log(user)

    //register the new user
    db.register(user, req.body.password, function(user){
        //add token
        var token = jwt.sign(user,config.secret, {expiresIn: 86400});
        res.cookie('token', token);
        res.redirect('coursework');
    });
});

//login
router.post('/login',
    function(req, res){
        Database.login(req.body.email, req.body.password)
        .then((user) => {
            console.log("Log in Successful");
            var token = jwt.sign({_id: user._id}, config.secret, {expiresIn: 86400});
            res.cookie('token', token);
        }).then(result => {
            res.redirect('coursework');
        })
        .catch((error) => {
            console.log('error', "Log in not Successful");
            res.redirect('/');
        });
    });

module.exports = router;