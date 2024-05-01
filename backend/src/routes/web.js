const express = require('express');
const { getHomePage, postCreateUser, getUsers, getUserDetail, updateUser, deleteUser } = require('../controllers/homeControllers');

const router = express.Router()

router.get('/', getHomePage);

router.post('/create-user', postCreateUser)

router.get('/users', getUsers)

router.get('/user/:id', getUserDetail)

router.post('/update-user/:id', updateUser)

router.delete('/user/:id', deleteUser)

module.exports = router