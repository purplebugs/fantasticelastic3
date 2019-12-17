// Using modules from npm
const fetch = require('node-fetch')
const jsdom = require('jsdom')

const url = 'https://en.wikipedia.org/wiki/List_of_Eurovision_Song_Contest_winners';
const { JSDOM } = jsdom;

fetch(url)
  .then(response => {
    return response.text() // Get plain text from the response
  })
  .then(text => {
    // This plain text is HTML which JSDOM will map to a DOM
    const dom = new jsdom.JSDOM(text);

    // The DOM has a .window property which has a .document property, similiar to how it is in a browser
    return dom.window.document;
  })
  .then(document => {
    // Get the title of the document
    const title = document.title;
    console.log('TITLE:', title);
    })
