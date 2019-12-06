// Using modules from npm
const fetch = require("node-fetch");
const express = require("express");

// To run: node server.js

// Constants
PORT = 8080;
HOST = '0.0.0.0';

// App
const app = express();

// Create node web server
app.get('/', (req, res) => { 

  fetch("http://0.0.0.0:9200") // Get status of Elasticsearch
  .then((res) => {
     return res.text()
  })
  .then((body) => {
      res.send(body)
  }).catch((error) => {
      res.send(error);
  });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log('Navigate to http://0.0.0.0:8080/ to see info about the Elasticsearch cluster running');