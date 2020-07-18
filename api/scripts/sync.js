const sequelize = require('../db/db.js');

// Defines the models on sequelize by reference
const User = require('../models/User.js');

sequelize.sync({ force: true });