const { cryptPassword } = require('../utils/encryption');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');
const bcrypt = require('bcrypt');

class User extends Model {
    constructor({ email, password }) {
      super();
      this.email = email;
      this.password = password;
    }

    validPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init({
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'user'
});

User.beforeCreate((user, options) => {
    return cryptPassword(user.password)
        .then(success => {
            user.password = success;
        })
        .catch(err => {
            if (err) console.log(err);
        });
});


module.exports = User;
