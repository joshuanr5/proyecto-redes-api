const express = require('express');
const authRoutes = require('./authRoutes');

const Router = express.Router();

// Aqui puede configurar el Router
Router.use('/auth', authRoutes);

module.exports = Router;
