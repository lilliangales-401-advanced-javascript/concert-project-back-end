'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');


require('dotenv').config();

const server = express();

// server.get('/express_backend', (request, response) => {
//   response.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

server.get('/search', renderSearchPage);

function renderSearchPage(request, response, next){
  let URL = `https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&k=${process.env.TASTEDIVEKEY}`;
  console.log(URL);
  return superagent.get(URL)
    .then(apiResponse => {
      let artistArray = [];
      for(let i = 0; i < apiResponse.body.Similar.Results.length; i++){
        artistArray.push(apiResponse.body.Similar.Results[i].Name);
      }
      response.json({ artistArray });
      console.log(artistArray);
    })
    .catch(error => new Error);

}


module.exports = {
  server : server,
  start: (port) => {
    server.listen(port, () => {
      console.log(`Server up on ${port}`);
    });
  }, 
};
