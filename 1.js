//app requires
const express = require('express');
const mustache = require('mustache-express');
const path = require("path");
var config = require("./config");
const Seed = require("./data/dbSeed");
var jwt = require('jsonwebtoken');
var parser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var DbAO = require("./data/DbAO");

//using express
const app = express();

//initialise databases
DbAO.init();

app.set('port', process.env.PORT || 3000);
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(cookieParser());


app.use(session({
    secret: "fdgsdfgfsd",
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
  }))

app.use(passport.initialize());
app.use(passport.session());

//seeding
//let seed = new Seed();
//seed.initUser();
//seed.initCoursework();

//routing
const userRoutes = require('./routes/userRoutes');
const courseworkRouter = require('./routes/courseworkRoutes');

//user auth
app.use('/', userRoutes);

//coursework
app.use('/coursework', courseworkRouter);

// a custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// a custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
console.log('Express started on http://localhost:' + 
app.get('port') + '; press Ctrl-C to terminate.'
    );
});
