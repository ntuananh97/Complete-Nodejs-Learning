const express = require('express');
const {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  uploadSingleFileApi,
  uploadMultipleFilesApi,
} = require("../controllers/apiControllers");
const { createCustomerApi, bulkCustomersApi, getCustomersApi, updateCustomerApi, deleteCustomerApi } = require('../controllers/customerControllers');

const router = express.Router()

router.get('/users', getUsersApi);
router.post('/users', createUserApi);
router.put('/users/:id', updateUserApi);
router.delete('/users/:id', deleteUserApi);

router.post('/file', uploadSingleFileApi);
router.post('/files', uploadMultipleFilesApi);

router.get('/customers', getCustomersApi)
router.post('/customers', createCustomerApi);
router.post('/customers/bulk', bulkCustomersApi);
router.put('/customers/:id', updateCustomerApi);
router.delete('/customers/:id', deleteCustomerApi);

module.exports = router