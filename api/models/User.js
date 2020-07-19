const bcrypt = require('bcrypt');
const connection = require('../db/db');

const cryptPassword = (password) => {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}

class User {
  constructor({email, password}) {
    this.email = email;
    this.password = password;
  }

  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async hashPassword() {
    this.password = await cryptPassword(this.password);
  }

  /**
   * @returns {Promise<unknown>}
   */
  async save() {
    return new Promise(async (resolve, reject) => {
      await this.hashPassword();
      connection.query(
        'INSERT INTO `users` (`email`, `password`) VALUES (?, ?)',
        [this.email, this.password],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        }
      )
    });
  }

  /**
   * @returns {Promise<User>}
   */
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM `users` WHERE `email` = ?',
        [email],
        (err, results) => {
          if (err) {
            reject(err);
            return;
          }

          const user = new User({
            email: results[0].email,
            password: results[0].password
          })

          console.log(user);

          resolve(user);
        }
      )
    });
  }
}


module.exports = User;