"use strict";

const app = require('../server_config.js');
const path = require('path');

// const client_static_path = path.join(__dirname, '../../public');
// app.use(express.static(client_static_path));   //serving static resources from here

app.get('/*', function(req, res) {        
  res.status(200).send(path.join(__dirname, '../../public/index.html'));      //redirects calls to the main directory("/") to here
});


