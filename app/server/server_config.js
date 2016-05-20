"use strict";  //es2015 ahead!!

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const route = require('./route/route_config');

const app = express();

app.use(express.static(route.path.root));   // static resoureces

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/*', route.serve.index); // serve index.html for all requests

module.exports = app;