const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  // Configurando express para que acepte tipo de datos json y urlencoded
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // Configurando express para que imprima un log de las consultas
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
  }
};
