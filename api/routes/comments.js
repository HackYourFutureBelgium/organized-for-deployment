const express = require('express');
const controllers = require('../controllers/interaction_controller');

const router = express.Router();

router.route('/').post(controllers.saveComment)
    .get(controllers.getComments);

module.exports = { new_comment: router };