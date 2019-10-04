'use strict';

const mongoose = require('mongoose');

const concerts = mongoose.Schema({
  id: { type: String, required: true },
  artist: { type: String, required: true },
  date: { type: String, required: true},
});

module.exports = mongoose.model('Concerts', concerts);


