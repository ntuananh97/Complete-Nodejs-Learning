const express = require('express');
const {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  uploadSingleFileApi,
  uploadMultipleFilesApi,
} = require("../controllers/apiControllers");
const { createCustomerApi, bulkCustomersApi } = require('../controllers/customerControllers');

const router = express.Router()

router.get('/users', getUsersApi);
router.post('/users', createUserApi);
router.put('/users/:id', updateUserApi);
router.delete('/users/:id', deleteUserApi);

router.post('/file', uploadSingleFileApi);
router.post('/files', uploadMultipleFilesApi);

router.post('/customers', createCustomerApi);
router.post('/customers/bulk', bulkCustomersApi);

module.exports = router