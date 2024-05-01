const express = require('express');
const { getHomePage } = require('../controllers/homeControllers');

const router = express.Router()

router.get('/', getHomePage);

module.exports = router