const express = require('express');
const { getUsersApi, createUserApi } = require('../controllers/apiControllers');

const router = express.Router()

router.get('/users', getUsersApi);

router.post('/users', createUserApi);

module.exports = router