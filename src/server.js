'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
require('dotenv').config();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const errorHandler = require('./middleware/server-error');
const notFound = require('./middleware/not-found');
const authRouter = require('./routes/auth.js');
const apiRouter = require('./routes/api.js');

server.use(authRouter);
server.use(apiRouter);
server.post('/search', renderSearchPage);
server.use('*', notFound);
server.use(errorHandler);

function renderSearchPage(request, response, next){
  let URL = `https://tastedive.com/api/similar?q=${request.body.selectedArtist}&k=${process.env.TASTEDIVEKEY}`;
  console.log(URL);
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
