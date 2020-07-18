const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');
const User = require('../models/User');

const {JWT_SECRET} = require('../config');

const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', function (req, res) {
  res.send('Welcome!');
});

app.get('/secret', withAuth, function (req, res) {
  res.send('You are visiting a protected page.');
});

app.post('/register', async (req, res) => {
  const {email, password} = req.body;
  const user = new User({email, password});

  try {
    await user.save();
  } catch (e) {
    res.sendStatus(500)
    return;
  }

  res.sendStatus(200);
});

app.post('/authenticate', async (req, res) => {
  const {email, password} = req.body;

  let user = null;

  try {
    user = await User.findOne({where: {email}});
  } catch (e) {
    res.sendStatus(401)
    return;
  }

  if (!user) {
    res.sendStatus(401)
    return;
  }

  if (user.validPassword(password)) {
    // Issue token
    const payload = {email};
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
  }
});

app.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200);
});

module.exports = app;