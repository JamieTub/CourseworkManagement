var express = require('express');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var Db = require('../bin')

var router = express.Router();
var db = new Database();

//registration
router.post('/register', function(req, res){
    //new instance of user
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email

    //reg the new user
    db.register(user, req.body.password, function(user){
        //token
        var token = jwt.sign()
        res.cookie('auth'. token);
        res.redirect('/');
    });
});