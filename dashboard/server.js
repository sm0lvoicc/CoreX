var express = require('express');
var app = express();
var fs = require("fs")
var client = require(`../index`)
// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.send(`works`);
});

app.listen(3000);
console.log('Server is listening on port 3000');