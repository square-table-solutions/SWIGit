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

// app.get('/_api/auth', route.utils.signin);
app.post('/_api/auth', route.utils.signup);

app.post('/_api/post', route.utils.publish);
app.post('/_api/posts', route.utils.fetch_posts);
app.post('/_api/delete_post', route.utils.delete_post);

app.get('/*', route.serve.index); 

module.exports = app;