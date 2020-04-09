//app
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

//mustache
mustache = require('mustache-express'),
path = require('path');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
//app.set('views', path.resolve(__dirname, 'mustache'));

//db
const Seed = require("./dbSeed");
let seed = new Seed();

//seed.initUser();
app.get('/', function(req, res){
    res.status(200);
         res.type('text/plain');
     res.send('Landing Page');
    });   

app.get('/about', function(req, res){
    res.status(200);
    res.type('text/plain');
    res.send('About');
});

//coursework page
app.get("/coursework", function(request, response){
    response.render("coursework", {
        'entries' : [
            {
                'Title' : 'Chemistry',
                'Module' : 'Chemistry PT',
                'DueDate' : '07/08/2020',
                'CompDate' : '05/04/2020'
            },
            {
                'Title' : 'History',
                'Module' : 'History 1912 WWI',
                'DueDate' : '07/04/2020',
                'CompDate' : '05/04/2020'
            },
            {
                'Title' : 'Physics',
                'Module' : 'Physics LG',
                'DueDate' : '07/06/2020',
                'CompDate' : '10/06/2020'
            },
            {
                'Title' : 'Mathematics',
                'Module' : 'Mathematics QE',
                'DueDate' : '06/06/2020',
                'CompDate' : '02/03/2020'
            },
            {
                'Title' : 'Gym',
                'Module' : 'GYM LDR',
                'DueDate' : '02/05/2020',
                'CompDate' : '02/05/2020'
            }
        ]
    });
});

app.post('/register', function(req, res){
    res.type('text');
    console.log(req.body);
    res.redirect('/');
});

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
