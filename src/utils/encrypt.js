const md5 = require('md5');

function hashSync(data) {
  const hash = md5(data);
  return hash;
}

function checkPassword(password, hash) {
  const hashedPassword = hashSync(password);

  return hashedPassword === hash;
}

module.exports = {
  hashSync,
  checkPassword,
};
