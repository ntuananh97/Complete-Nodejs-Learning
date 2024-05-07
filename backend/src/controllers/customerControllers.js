const { createCustomerService, bulkCustomersService, getCustomersService, updateCustomersService, deleteCustomersService } = require("../services/customerServices");
const { uploadSingleFileService } = require("../services/uploadFile");

const createCustomerApi = async (req, res) => {
  const { name, email, phone, address, description } = req.body;

  const noImageFile = !req.files || Object.keys(req.files).length === 0;

  let imageUrl = '';

  if (!noImageFile) {
    const uploadedFile = req.files.image;
    const result = await uploadSingleFileService(uploadedFile);

    if (result.status === 'success') imageUrl = result.path
  } 

  const creatingData = {
    name,
    email,
    phone,
    address,
    description,
    image: imageUrl,
  };

  const newCustomer = await createCustomerService(creatingData)

  res.status(200).json({
    data: newCustomer,
    errorCode: 0
})
};

const bulkCustomersApi = async (req, res) => {
    const results = await bulkCustomersService(req.body?.customers || [])

    return res.status(200).json({
        data: results,
        errorCode:results ? 0 : 1
    })
    
}

const getCustomersApi = async (req, res) => {
    const results = await getCustomersService()

    return res.status(200).json({
        data: results,
        errorCode:results ? 0 : 1
    })
    
}

const updateCustomerApi = async (req, res) => {
    const userId = req.params.id;
    const updatingData = req.body;

    const results = await updateCustomersService(userId, updatingData)

    return res.status(200).json({
        data: results,
        errorCode:results ? 0 : 1
    })
    
}

const deleteCustomerApi = async (req, res) => {
    const userId = req.params.id;

    const results = await deleteCustomersService(userId)

    return res.status(200).json({
        data: results,
        errorCode:results ? 0 : 1
    })
    
}

module.exports = {
  createCustomerApi,
  bulkCustomersApi,
  getCustomersApi,
  updateCustomerApi,
  deleteCustomerApi
};
