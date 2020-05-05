var express = require('express');
var Database = require("../data/DbAO");
var jwt = require('jsonwebtoken');
var config = require('../config');

var router = express.Router();
var db = new Database();
db.ini

module.exports = router;

//load coursework page to get all coursework
router.get('/', function(req, res) {
    //get the current logged in user
    var token = req.cookies.token;
    jwt.verify(token, config.secret, function(error, data){
        //get the users existing coursework
        db.getAllCoursework()
        .then((list) => {
            res.render('coursework', {
                "title": 'Coursework List',
                "coursework": {}
            });
            console.log("Retrieved Coursework:", list);
        })
        .catch((err) => {
            console.log('Error retrieving all coursework:', err);
        });
    });
    return;
});

//create a new coursework
router.get('/create', function(req, res) {
    //get the current logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(error, data){
        //load the cw create form
        res.render("cw-create", {'title':'Create Coursework'});
    })
    return;
});

//create a new coursework
router.post('/create', function(req, res) {
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