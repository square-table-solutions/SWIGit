"use strict";  //es2015 ahead!!

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); 

const app = express();

const client_static_path = path.join(__dirname, '../public');
app.use(express.static(client_static_path));   //serving static resources from here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/*', function(req, res) {      
  res.status(200).sendFile('index.html', {root: client_static_path});      //redirects calls to the main directory("/") to here
});

module.exports = app;