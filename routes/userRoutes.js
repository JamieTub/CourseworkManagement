var express = require('express');
var User = require("../models/User");
var db = require("../data/DbAO");
var jwt = require('jsonwebtoken');
var config = require('../config');


var router = express.Router();

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
    db.register(user, req.body.password)
        //add token
        .then((user) => {
            var token = jwt.sign({_id: user._id},config.secret, {expiresIn: 86400});
            res.cookie('token', token);
            res.redirect('/coursework/');
        }).catch((error) => {
            console.log('Breaks here.' + error);
        });
});

router.get('/login', function(req, res){
    res.render('login', {});
}); 

//login
router.post('/login',
    function(req, res){
        db.login(req.body.email, req.body.password)
        .then((user) => {
            console.log("Log in Successful");
            var token = jwt.sign({_id: user._id}, config.secret, {expiresIn: 86400});
            res.cookie('token', token);
            res.redirect('/coursework');
        })
        .catch((error) => {
            console.log('error', "Log in not Successful");
            res.redirect('/login');
        });
    });


router.get('/logout', function(req, res) {
    //remove the token
    res.clearCookie('token');
    res.redirect('/login');
})

module.exports = router;