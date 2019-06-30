const express = require('express');
const passport = require('passport');

const app = express();

app.get('/', (req, res) => {
  res.send('Bienvenidos al API del proyecto de redes');
});

require('./config/db')(app);
require('./config/express')(app);
require('./config/passport')(app, passport);
require('./config/routes')(app, passport);

module.exports = app;
