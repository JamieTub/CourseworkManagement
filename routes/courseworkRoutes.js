var express = require('express');
var db = require("../data/DbAO");
var jwt = require('jsonwebtoken');
var config = require('../config');

var router = express.Router();

//load coursework page to get all coursework
router.get('/', function(req, res) {
    //get the current logged in user
    var token = req.cookies.token;
    console.log(token);
    jwt.verify(token, config.secret, function(error, data){
        //get the users existing coursework
        db.getAllCoursework(data)
        .then((list) => {
            console.log(list);
            res.render('coursework', {
                "title": 'Coursework List',
                "coursework": list
            });
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
    var token = req.cookies.token;
    jwt.verify(token, config.secret, function(error, data){
        //load the cw create form
        res.render("cw-create", {'title':'Create Coursework'});
    })
    return;
});

//create a new coursework
router.post('/create', function(req, res) {
    //get the current logged in user
    var token = req.cookies.token;
    jwt.verify(token, config.secret, function(error, data){
        if (!req.body.title) {
            res.status(400).send("Coursework title must be provided.");
            return;
        }
        db.addCoursework(req.body.title, req.body.module, req.body.dueDate, req.body.compDate, data);
        res.redirect('/coursework/');
    })
    return;
});

router.get('/delete/:courseworkId',
    function(req, res){
    db.deleteCoursework(req.params.courseworkId);
    res.redirect('/coursework/');
});
module.exports = router;