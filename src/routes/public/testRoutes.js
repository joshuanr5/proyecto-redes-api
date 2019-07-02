const express = require('express');
const testController = require('../../controllers/testController');

const Router = express.Router();

Router.post('/predict', testController.predict);

module.exports = Router;
