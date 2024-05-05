const User = require("../models/User")
const { uploadSingleFileService, uploadMultipleFilesService } = require("../services/uploadFile")


const getUsersApi = async (req, res) => {
    const results = await User.find({})

    return res.status(200).json({
        data: results,
        errorCode: 0
    })
}

const createUserApi = async (req, res) => {
    const {email, name, city} = req.body

    const newUser = await User.create({
        email,
        name, 
        city
    })

    return res.status(200).json({
        data: newUser,
        errorCode: 0
    })
}

const updateUserApi = async (req, res) => {
console.log("updateUserApi ~ updateUserApi:", )

    const userId = req.params.id;
    const requestBody = req.body
    
    const updatedUser = await User.updateOne({ _id: userId }, { ...requestBody });

    return res.status(200).json({
        data: updatedUser,
        errorCode: 0
    })
} 


const deleteUserApi = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await User.deleteOne({ _id: userId });
    res.status(200).json({
        data: deletedUser,
        errorCode: 0
    })
}

const uploadSingleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = req.files.image;
  const hasMultipleFile = Array.isArray(uploadedFile);
  console.log("req.files", req.files);

  const result = hasMultipleFile
    ? await uploadMultipleFilesService(uploadedFile)
    : await uploadSingleFileService(uploadedFile);
  console.log("uploadSingleFileApi ~ result:", result);

  if (result.status === "failed") return res.status(500).send(result.error);

  return res.send("Upload successfully!");
}


module.exports = {
    getUsersApi,
    createUserApi,
    updateUserApi,
    deleteUserApi,
    uploadSingleFileApi,
}