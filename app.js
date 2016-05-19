"use strict";  //es2015 ahead!!

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const port = null || 8080;  //localhost only at the moment

app.use(express.static('public'));   //serving static resources from here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, function() {
  console.log("listening on localhost: ", port);
});
app.get('/', function(req, res) {        
	res.redirect(path.join(__dirname + '/public/index.html'));      //redirects calls to the main directory("/") to here
});

