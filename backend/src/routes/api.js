const express = require('express');
const {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  uploadSingleFileApi,
} = require("../controllers/apiControllers");

const router = express.Router()

router.get('/users', getUsersApi);

router.post('/users', createUserApi);

router.put('/users/:id', updateUserApi);

router.delete('/users/:id', deleteUserApi);

router.post('/file', uploadSingleFileApi);

module.exports = router