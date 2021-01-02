const express = require('express');
const controllers = require('../controllers/controller');

const router = express.Router();

router.route('/new').post(controllers.saveComment);

module.exports = { new_comment: router };