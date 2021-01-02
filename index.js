// this is the main entry point for your full app
// it serves your frontend & provides access to your API

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbconnect = require('./api/utils/db');

const School = require('./models/School');
const comments_router = require('./api/routes/comments');

const api = require('./api/server');

const { countDocuments } = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect Mongo DB

// moved to utils/db.js
//mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => console.log('connected to database'));
dbconnect();

mongoose.Promise = global.Promise;


app.use((req, res, next) => {
    console.log(req.method + ': ' + req.path);
    next();
});

app.use('/', express.static(__dirname + '/client/build/'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.use('/api', api);

// get all schools
app.get('/schools', (req, res, next) => {
    School.find({}).then((school) => {
        res.send(school)
    }).catch(next);
})

//add school
app.post('/schools', (req, res, next) => {
    School.create(req.body).then((school) => {
        res.send(school)
    }).catch(next);
})

// get the closest school
app.get('/closestschools', (req, res, next) => {
    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);
    School.find({
        location: {
            $near: {
                $maxDistance: 1000,
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            }
        }
    }).find((error, results) => {
        if (error) console.log(error);
        res.send(results)
    });
})

// add a comment to a certain school by schoolId 
app.use('/schools/comments', comments_router.new_comment);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));