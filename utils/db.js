const mongoose = require('mongoose');

const dbconnect = async() => {
    try {

        const conn = await mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

        console.log(`db connected on ${conn.connection.host}`);

    } catch (error) {

        console.log('Could not connect to DB');
        process.exit(1);

    }
}

module.exports = dbconnect;