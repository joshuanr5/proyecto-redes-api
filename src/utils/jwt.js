const jwt = require('jsonwebtoken');
const config = require('../config/config');

function sign(data) {
  const token = jwt.sign(data, config.app.authSecretKey);
  return token;
}

module.exports = {
  sign,
};
