'use strict';

const express = require('express');
const router = express.Router();

const User = require('../model/user/schema.js');
const auth = require('../middleware/auth.js');

router.post('/signup', (request, response, next) => {
  let user = new User(request.body);
  user.save()
    .then(user => {
      request.token = user.generateToken();
      request.user = user;
      response.set('token', request.token);
      response.cookie('auth', request.token);
      response.send(request.token);
    })
    .catch(next);
});

router.post('/signin', auth(), (request, response, next) => {
  response.set('token', request.token);
  response.cookie('auth', request.token);
  response.send(request.token);
});

module.exports = router;