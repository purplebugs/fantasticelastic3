const fetch = require("node-fetch"); // Using module from npm

// To run: node index.js
console.log('Hello World!');

// Using npm module for API requests
fetch("http://localhost:9200")
    .then((res) => {
       return res.text()
    })
    .then((body) => {
        console.log(body)
    }).catch((error) => {
        console.log(error);
    });

// Keep process alive, ping every 5 seconds
setInterval(() => {
    console.log("This text will print out every 5 seconds")
},5000)