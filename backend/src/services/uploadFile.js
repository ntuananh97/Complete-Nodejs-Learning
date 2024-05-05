const express = require("express");

const handleResponse = (status, path, error) => ({
    status, path, error
})

const uploadSingleFileService = async (uploadFile) => {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //   const uploadPath = express.static(path.join('./src', 'public', 'images'));
  const uploadPath = __dirname + uploadFile.name;

  // Use the mv() method to place the file somewhere on your server
  try {
    await uploadFile.mv(uploadPath);
    return handleResponse("success", ["link-image"], null);
  } catch(err) {
    return handleResponse("failed", [], err);
  }
};

const uploadMultipleFilesService = async (uploadedFiles = []) => {
    try {
        const results = await Promise.all(uploadedFiles.map(file => uploadSingleFileService(file)))
        return handleResponse("success", results.map(res => res.path).flat(1), null);
    }
    catch (error) {
        return handleResponse("failed", [], err);
    }
    
}

module.exports = {
  uploadSingleFileService,
  uploadMultipleFilesService
};
