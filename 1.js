//app
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
bodyParser = require('body-parser'),
app.use(bodyParser.urlencoded({extended: false}));

//mustache
mustache = require('mustache-express'),
path = require('path');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//db
const Seed = require("./dbSeed");
let seed = new Seed();
seed.init();

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

app.get("/coursework", function (request, response) {
    seed.all()
        .then((list) => {
            console.log(list);
            response.render("coursework", {
                entries: list
            });
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
});

//new coursework
app.get('/cw-entry', function(request, response){
    response.render("cw-entry");
})

//cw-entry post
app.post('/post', function(request, response){
    if (!request.body.User || !request.body.Title) {
        response.status(400).send("Coursework Entries must have a title and user.");
        return;
    }
    
entries.create(request.body.Title, 
request.body.Module,request.body.DueDate, request.body.CompDate);                          
    response.redirect("/coursework");
})


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
