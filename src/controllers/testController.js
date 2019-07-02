const _ = require('lodash');
const axios = require('axios');
const encrypt = require('../utils/encrypt');
// const userHelper = require('../utils/helpers/userHelper');
const { handleError, validateBody } = require('../utils/helpers/expressHelper');

async function predict(req, res) {
  const { db } = req.app;
  const {
    Age,
    Sexo,
    Trabajo,
    Alojamiento,
    CuentaDeAhorros,
    MontoDeCredito,
    Duracion,
    Proposito,
  } = req.body;
  const attributes = [
    'Age',
    'Sexo',
    'Trabajo',
    'Alojamiento',
    'CuentaDeAhorros',
    'MontoDeCredito',
    'Duracion',
    'Proposito',
  ];
  const [attributesNotFound, messageDetails] = validateBody(req.body, attributes);

  if (!_.isEmpty(attributesNotFound)) {
    return res.status(400).json({ message: 'Consulta incorrecta', details: messageDetails });
  }
  try {
    const data = {
      Age,
      Sexo,
      Trabajo,
      Alojamiento,
      'Cuenta de ahorros': CuentaDeAhorros,
      'Monto de credito': MontoDeCredito,
      Duracion,
      Proposito,
    };

    const result = await axios.post('https://proyecto-redes-flask.herokuapp.com/predict', data);
    console.log('asdhasdgajhsda', result.data);
    return res.json(result.data);
  } catch (error) {
    console.log('error?');

    const errorMessage = handleError(error);
    return res.status(500).json(errorMessage);
  }
}

module.exports = {
  predict,
};
