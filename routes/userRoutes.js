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

//load coursework page to get all coursework
router.get('/coursework', function(req, res) {
    //get the current logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(error, data){
        //get the users existing coursework
        cDAO.getAllCoursework()
        .then((list) => {
            res.render('coursework', {
                "title": 'Coursework List',
                "coursework": list
            });
            console.log("Retrieved Coursework:", list);
        })
        .catch((err) => {
            console.log('Error retrieving all coursework:', err);
        });
    })
    return;
});

//create a new coursework
router.get('/cw-create', function(req, res) {
    //get the current logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(error, data){
        //load the cw create form
        res.render("cw-create", {'title':'Create Coursework'});
    })
    return;
});

//create a new coursework
router.post('/cw-create', function(req, res) {
    //get the current logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(error, data){
        if (!req.body.title) {
            res.status(400).send("Coursework title must be provided.");
            return;
        }
        //var grunt = (/true/i).test(request.body.grant);
        cDAO.addCoursework( req.body.title, req.body.module, req.body.dueDate, req.body.compDate);
        res.redirect("coursework");
    })
    return;
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
module.exports = router;