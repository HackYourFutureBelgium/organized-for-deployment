const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const School = require('./models/School');
const comments_router = require('./routes/comments');
const dbconnect = require('./utils/db');


app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const buildPath = path.join(__dirname +'/client' +'/build');
app.use(express.static(buildPath));

dbconnect();
mongoose.Promise = global.Promise;

const userRouter = require('./routes/User');
app.use('/user',userRouter);

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

