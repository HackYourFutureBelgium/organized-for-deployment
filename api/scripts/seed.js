const { cryptPassword } = require('../utils/encryption');
const User = require('../models/User.js');

const createUsers = async () => {
  return await User
    .findOrCreate({
      where: {email: 'john@doe.com'},
      defaults: {password: await cryptPassword('Azerty123')}
    });
}

createUsers()
  .then(() => {
    process.exit();
  });
