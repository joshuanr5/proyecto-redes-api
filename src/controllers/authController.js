const _ = require('lodash');
const encrypt = require('../utils/encrypt');
const userHelper = require('../utils/helpers/userHelper');
const { handleError, validateBody } = require('../utils/helpers/expressHelper');

async function signup(req, res) {
  const { db } = req.app;
  const { firstname, lastname, email, password, password2 } = req.body;
  const attributes = ['firstname', 'lastname', 'email', 'password', 'password2'];
  const [attributesNotFound, messageDetails] = validateBody(req.body, attributes);

  if (!_.isEmpty(attributesNotFound)) {
    return res.status(400).json({ message: 'Consulta incorrecta', details: messageDetails });
  }

  if (password !== password2) {
    return res.status(400).json({ message: 'Las claves no concuerdan' });
  }

  try {
    // validar si existe email
    const user = (await db()
      .first()
      .from('user')
      .where('email', email)) || {};

    if (!_.isEmpty(user)) {
      return res.status(400).json({ message: 'El correo electrónico esta en uso' });
    }

    const data = {
      first_name: firstname,
      last_name: lastname,
      email,
      password: encrypt.hashSync(password),
    };

    const [userId] = await db('user').insert(data);

    const newUser = await db()
      .first()
      .from('user')
      .where('id', userId);

    const token = userHelper.getToken(newUser);
    return res.json({ token });
  } catch (error) {
    const errorMessage = handleError(error);
    return res.status(500).json(errorMessage);
  }
}

async function login(req, res) {
  const { db } = req.app;
  const { email, password } = req.body;
  const attributes = ['email', 'password'];
  const [attributesNotFound, messageDetails] = validateBody(req.body, attributes);

  if (!_.isEmpty(attributesNotFound)) {
    return res.status(400).json({ message: 'Consulta incorrecta', details: messageDetails });
  }

  try {
    // Validar si email existe 'email no registrado'
    const user = (await db()
      .first()
      .from('user')
      .where('email', email)) || {};

    if (_.isEmpty(user)) {
      return res.status(400).json({ message: 'Correo electrónico no registrado' });
    }

    // Validar password 'password incorrecto'
    if (!encrypt.checkPassword(password, user.password)) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = userHelper.getToken(user);

    // Enviar token
    return res.json({ token });
  } catch (error) {
    const errorMessage = handleError(error);
    return res.status(500).json(errorMessage);
  }
}

// async function doctorLogin(req, res) {
//   console.log('body ->', req.body);

//   const { db } = req.app;
//   const { email, password } = req.body;
//   const [attributesNotFound, messageDetails] = validateBody(req.body, ['email', 'password']);

//   if (!_.isEmpty(attributesNotFound)) {
//     return res.status(400).json({ message: 'Consulta incorrecta', details: messageDetails });
//   }

//   try {
//     const doctor = (await db
//       .first()
//       .from('medico')
//       .where('email', email)) || {};

//     if (_.isEmpty(doctor)) {
//       return res.status(400).json({ message: 'Correo electrónico inválido' });
//     }

//     if (!doctor.activated) {
//       return res.status(400).json({ message: 'El médico se encuentra desactivado' });
//     }

//     const isValid = await encrypt.checkPassword(password, doctor.password);

//     if (!isValid) {
//       return res.status(401).json({ message: 'Contraseña incorrecta' });
//     }

//     const token = doctorHelper.getToken(doctor);

//     return res.json({ token });
//   } catch (error) {
//     const errorMessage = handleError(error);
//     return res.status(500).json(errorMessage);
//   }
// }

module.exports = {
  // doctorLogin,
  signup,
  login,
};
