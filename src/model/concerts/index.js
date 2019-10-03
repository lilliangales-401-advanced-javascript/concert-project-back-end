'use strict';

const schema = require('./schema.js');
const MongooseModel = require('../mongoose-model.js');

class Concerts extends MongooseModel { }

module.exports = new Concerts(schema);
