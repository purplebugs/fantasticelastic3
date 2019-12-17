// Using modules from npm
const fetch = require('node-fetch')
const jsdom = require('jsdom')

const url = 'https://en.wikipedia.org/wiki/List_of_Eurovision_Song_Contest_winners';
const { JSDOM } = jsdom;

const winners = [

]

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

    // TODO ?? get 0th row for storing headings into object properties
    
    // If only specify .wikitable this picks up more than one table. TODO scope to only the first table, select 0th .wikitable ?
    const winnersTableRows = document.querySelectorAll(".wikitable.sortable.plainrowheaders > tbody > tr")
    console.log('WINNERS TABLE  - Row[1]:', winnersTableRows[1].innerHTML) // Start from row 1 as row 0 is header
    let counter = 0
    winnersTableRows.forEach(function(row) {
      counter++
      console.log(counter, '***************************')
      console.log(row.innerHTML)
      
        const winnersTableRow = row.querySelectorAll("th a, td")
        console.log(`------- Row ${counter} contains ${winnersTableRow.length} items -------`)

        winnersTableRow.forEach(function(itemInRow) {
          console.log(itemInRow.innerHTML)

          // Work in progress
        })
    });

    console.log('Total winnersTableRows:', counter) // 69

    // Try accessing the table
    // #mw-content-text > div > table.wikitable.sortable.plainrowheaders.jquery-tablesorter > tbody > tr:nth-child(1) > th

    // This Prints out Switzerland - first row of competition, child(3) prints out next row etc
    // const winnersTableRow = document.querySelectorAll(".wikitable > tbody > tr:nth-child(2)")
    // console.log('WINNERS TABLE  - Row[1]:', winnersTableRow[0].innerHTML)

    const winnersTableYears = document.querySelectorAll(".wikitable > tbody > tr > th > a")
    console.log('Number of Years: ', winnersTableYears.length)
    winnersTableYears.forEach(function(row) {
      const winner = {
        year: row.innerHTML,
        date: "",
        hostCity: "",
        winner: "",
        song: "",
        performer: "",
        language: "",
        points: "",
        margin: "",
        runnerUp: "",
         }
      winners.push(winner)
    })
    
    console.log('Winners: ', winners)

  })