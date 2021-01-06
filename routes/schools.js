const express = require('express');
const router = express.Router();

const School = require('../models/School');

// Get all schools, public access

router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);

  } catch(err) {
    console.error(err.message);
    res.status(500).send("Server error")
  }
})

module.exports = router;