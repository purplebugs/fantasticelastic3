// Using modules from npm
const fetch = require('node-fetch')
const jsdom = require('jsdom')

const url = 'https://en.wikipedia.org/wiki/List_of_Eurovision_Song_Contest_winners';
const { JSDOM } = jsdom;

const winners = [

]

const handle1956 = function(elements){
  console.log('Need to handle 1956 differently since there were no points, margins or runners up. TODO')
  //console.log(elements[0].innerHTML)
  return {name:"1956 TO DO"}
}

const handle1969 = function(elements){
  console.log('Need to handle 1969 differently since there were 4 winners. TODO')
  //console.log(elements[0].innerHTML)
  return {name:"1969 TO DO"}
}

const handle2020 = function(elements){
  console.log('Need to handle 2020 differently since the competition has not started. TODO')
  //console.log(elements[0].innerHTML)
  return {name:"2020 TO DO"}
}

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
    
    // If only specify .wikitable this picks up more than one table
    // Get the table
    const winnersTableRows = document.querySelectorAll(".wikitable.sortable.plainrowheaders > tbody > tr")

    // Get the rows
    winnersTableRows.forEach(function(row) {

        //const winnersTableRow = row.querySelectorAll("th a, td, td:nth-child(3) > a, td")

        // Get year from current row
        
        const yearElement = row.querySelectorAll("th a")[0];
        const restOfElements = row.querySelectorAll("td");
        let thisYearsWinner;

        if (yearElement) {
          const year = yearElement.textContent
          switch (year) {
            case "1956" :  
              thisYearsWinner = handle1956(restOfElements)
              winners.push({year: thisYearsWinner})
              break
            case "1969" : 
              thisYearsWinner = handle1969(restOfElements)
              winners.push({year: thisYearsWinner})
              break
            case "2020" :
              thisYearsWinner = handle2020(restOfElements)
              winners.push({year: thisYearsWinner})
            break

            default:

            if (restOfElements[0] && restOfElements[1] && restOfElements[2] && restOfElements[3]) { // Check none are undefined
              if (restOfElements[1].querySelectorAll("a")[1] &&
                    restOfElements[1].querySelectorAll("a")[1].innerHTML &&
                      restOfElements[2].querySelectorAll("a")[0].innerHTML &&
                        restOfElements[3].querySelectorAll("a")[0].innerHTML &&
                          restOfElements[4].querySelectorAll("a")[0].innerHTML) { // Check not undefined

              winners.push({
                year: year,
                date: restOfElements[0].innerHTML.trim(),
                hostCity: restOfElements[1].querySelectorAll("a")[1].innerHTML,
                winner: restOfElements[2].querySelectorAll("a")[0].innerHTML,
                song: restOfElements[3].querySelectorAll("a")[0].innerHTML,
                performer: restOfElements[4].querySelectorAll("a")[0].innerHTML,

                // Work in progress
              })
             }
            }
          }
        }

    })

    // console.log('Total winnersTableRows:', rowCounter) // 69

    // Try accessing the table
    // #mw-content-text > div > table.wikitable.sortable.plainrowheaders.jquery-tablesorter > tbody > tr:nth-child(1) > th

    // This Prints out Switzerland - first row of competition, child(3) prints out next row etc
    // const winnersTableRow = document.querySelectorAll(".wikitable > tbody > tr:nth-child(2)")
    // console.log('WINNERS TABLE  - Row[1]:', winnersTableRow[0].innerHTML)

    // const winnersTableYears = document.querySelectorAll(".wikitable > tbody > tr > th > a")
    // console.log('Number of Years: ', winnersTableYears.length)
    // winnersTableYears.forEach(function(row) {
      // const winner = {
      //   year: row.innerHTML,
      //   date: "",
      //   hostCity: "",
      //   winner: "",
      //   song: "",
      //   performer: "",
      //   language: "",
      //   points: "",
      //   margin: "",
      //   runnerUp: "",
      //    }
      // winners.push(winner)
    // })
    
    console.log('Winners: ', winners)

  })