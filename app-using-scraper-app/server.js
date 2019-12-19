// Using modules from npm
const fetch = require("node-fetch");
const express = require("express");

// Using custom app
const scraper = require("./scraper");

// Constants
PORT = 8080;
HOST = '0.0.0.0';

// App
const app = express();
scraper.start().then(wins => {console.log(wins)}); // WIP Simple outout of object from data scraper tool

// Create node web server
app.get('/', (req, res) => { 

// Use promise all construct to run requests synchronously
Promise.all([
    fetch("http://es01:9200").then((fetchResponses) => {return fetchResponses.json()}), // To be able to access json object properties
    fetch("http://es01:9200/_cat/indices?v").then((fetchResponses) => {return fetchResponses.text()})
    
    // TODO send JSON of Eurovision data from scraper.start() to Elasticsearch eg:
    /*
    PUT eurovision_winners_book3/_bulk
    {"index":{"_id":"1"}}
    {"year": "2019-05-18","country": "Netherlands", "song": "Arcade", "performer": "Duncan Laurence", "language": "English" }
    {"index":{"_id":"2"}}
    {"year":"2018-05-12","country":"Israel","song":"Toy","performer":"Netta","language":"English"}
    { "index" : { "_id" : "3" } }
    {"year":"2017-05-13","country":"Portugal","song":"Amar pelos dois","performer":"Salvador Sobral","language":"Portugese"}
    ... etc ...
    */

]).then((bodies) => {
    res.send(

        // Output responses from fetch commands
        bodies[0].name + // Able to access json object properties
        bodies[1]); // This is text

}).catch((error) => {res.send(error)})

});

app.listen(PORT, HOST);

// Note: This output is only useful if not running inside a docker container, since this console is not seen from outside the container
console.log(`Running on http://${HOST}:${PORT}`);
console.log('Navigate to http://0.0.0.0:8080/ to see info about the Elasticsearch cluster running');

/*

TODO: Test elasticesearch is running: curl -X GET "localhost:9200/_cat/nodes?v&pretty"

Expected response:
ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
172.27.0.2           23          62   1    0.34    0.24     0.18 dilm      *      es01

*/