"use strict"; 

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const route = require('./route/route_config');

const app = express();

app.use(express.static(route.path.root));  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/*', route.serve.index); 

app.post('/_/api/post', route.utils.publish);

app.post('/signup', route.utils.signup);

app.post('/_/api/posts', route.utils.fetch_posts);

app.post('/_/api/delete_post', route.utils.delete_post);

module.exports = app;