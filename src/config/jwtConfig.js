require('dotenv').config();
const jwt = require('express-jwt');
const secret = 'secretkey';

module.exports = {
  secret: secret,
  algorithms: ['HS256'],
  expiresIn: '1h' // token expiration time
};


