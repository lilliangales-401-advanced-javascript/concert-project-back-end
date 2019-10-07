'use strict';

module.exports = (request, response, next) => {
  const modelName = request.params.model;
  request.model = require(`../model/${modelName}`);
  next();
};
