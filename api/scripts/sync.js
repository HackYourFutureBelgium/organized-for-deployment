const connection = require('../db/db.js');

const usersStatement = `
  CREATE TABLE \`users\` (
    \`email\` varchar(255) NOT NULL,
    \`password\` text NOT NULL,
    PRIMARY KEY (\`email\`)
  );
`;


const createUserTable = async () => {
  connection.query(
    usersStatement,
    [],
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('created users table');
    }
  );
}

createUserTable()
  .then(() => {
    process.exit();
  })
