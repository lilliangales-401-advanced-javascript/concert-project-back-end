'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const superagent = require('superagent');
const server = express();
require('dotenv').config();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/hello', (req, res) => {
  console.log(req.body);
  res.text = req.body;
  res.send({ express: req.body});
});

server.post('/search', renderSearchPage);

function renderSearchPage(request, response, next){
  let URL = `https://tastedive.com/api/similar?q=${request.body.selectedArtist}&k=${process.env.TASTEDIVEKEY}`;
  return superagent.get(URL)
    .then(apiResponse => {
      let artistArray = [];
      for(let i = 0; i < apiResponse.body.Similar.Results.length; i++){
        artistArray.push(apiResponse.body.Similar.Results[i].Name);
      }
      response.send([artistArray]);
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
