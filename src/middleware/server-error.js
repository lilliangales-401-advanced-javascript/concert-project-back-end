'use strict';

module.exports = (error, request, response, next) => {
  console.log(error);
  response.status(500);
  response.statusMessage = 'Server Error';
  response.json({ error: error });
};
