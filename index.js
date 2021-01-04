const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(express.json());
const User = require('./models/User');
const School = require('./models/School');


const buildPath = path.join(__dirname +'/client' +'/build');
app.use(express.static(buildPath));

mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false}, ()=> console.log('connected to database'));
mongoose.Promise = global.Promise;

const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.use(cors());
app.use(bodyParser.json());

// get all schools
app.get('/schools', (req, res, next)=>{
    School.find({}).then((school)=>{
      res.send(school)
    }).catch(next);
  })
  
  //add school
  app.post('/schools', (req, res, next)=>{
    School.create(req.body).then((school)=>{
      res.send(school)
    }).catch(next);
  })
  
  // get the closest school
  app.get('/closestschools', (req, res, next)=>{
    const longitude = parseFloat(req.query.lng);
    const latitude = parseFloat(req.query.lat);
    School.find({
      location: {
        $near : {
          $maxDistance: 1000,
          $geometry : {
            type : 'Point',
            coordinates:[longitude,latitude]
          }
        }
      }
    }).find((error,results)=>{
      if (error) console.log(error);
      res.send(results)
    });
  })

  const port = process.env.PORT || 9000;
  app.listen(port, () => console.log(`listening at http://localhost:${port}`));