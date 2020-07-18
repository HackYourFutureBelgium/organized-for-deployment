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

const cryptPassword = (password) => {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) return reject(err);
            return resolve(hash);
        });
    });
}

module.exports = User;