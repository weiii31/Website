const express = require('express');
const router = express.Router();
const { isAuth } = require('../controllers/auth')
const { index } = require('../controllers/home')

router.route('/')
  .get(isAuth, index)

module.exports = router;
