var express = require('express');
var Coursework = require("../models/Coursework");
var Database = require("../data/DbAO");
var jwt = require('jsonwebtoken');
var config = require('../config');

var router = express.Router();
var db = new Database();

router.get('/', function(req, res) {
    //get the current logged in user
    var token = req.cookies.auth;
    jwt.verify(token, config.secret, function(error, data){
        //get the users exsisting coursework

        res.render('coursework', {}
        );
        return;
    })
    return;
});
module.exports = router;