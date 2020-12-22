const { TestScheduler } = require('jest');
const sequelize = require('../db/db.js');
const User = require('../models/User.js');

const createTables = async () => {
  const result = await sequelize.sync({ force: true });
}

createTables()
  .then(() => {
    process.exit();
  });
