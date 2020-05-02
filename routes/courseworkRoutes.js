var express = require('express');
var Database = require("../data/DbAO");
var jwt = require('jsonwebtoken');
var config = require('../config');

var router = express.Router();
var db = new Database();

module.exports = router;