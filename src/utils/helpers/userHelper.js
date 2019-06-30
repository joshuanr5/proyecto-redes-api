const jwt = require('../jwt');

function getToken(user) {
  const { id, first_name, last_name, email } = user;

  const userToken = {
    id,
    firstname: first_name,
    lastname: last_name,
    email,
  };

  const token = jwt.sign(userToken);

  return token;
}

module.exports = {
  getToken,
};
