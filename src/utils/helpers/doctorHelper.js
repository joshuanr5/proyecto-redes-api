const jwt = require('../jwt');

function getToken(doctor) {
  const { id, first_name, last_name, phone_number, photo_url, email, about } = doctor;

  const doctorToken = {
    id,
    firstName: first_name,
    lastName: last_name,
    phoneNumber: phone_number || '',
    photoUrl: photo_url || '',
    email,
    about: about || '',
  };

  const token = jwt.sign(doctorToken);

  return token;
}

module.exports = {
  getToken,
};
