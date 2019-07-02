const express = require('express');
const authRoutes = require('./authRoutes');
const testRoutes = require('./testRoutes');

const Router = express.Router();

// Aqui puede configurar el Router
Router.use('/auth', authRoutes);
Router.use('/test', testRoutes);


module.exports = Router;
