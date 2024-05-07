const path = require("path");

const handleResponse = (status, path, error) => ({
    status, path, error
})

const getFileInfo = (uploadFileName = "") => {
  const uploadPath = path.resolve(__dirname, '../public/upload')
  const fileExtension = path.extname(uploadFileName);
  const basename = path.basename(uploadFileName, fileExtension);

  const finalName = `${basename}-${Date.now()}${fileExtension}`;
  const finalPath = `${uploadPath}/${finalName}`

  return {
    finalName,
    finalPath
  }
}


/**
 * @return {{
 * status: 'success' | 'failed',
 * path: string,
 * error: Object
 * }}
 */
const uploadSingleFileService = async (uploadFile) => {
  const {finalName, finalPath} = getFileInfo(uploadFile.name);

  // Use the mv() method to place the file somewhere on your server
  try {
    await uploadFile.mv(finalPath);
    return handleResponse("success", finalName, null);
  } catch(err) {
    return handleResponse("failed", null, err);
  }
};

const uploadMultipleFilesService = async (uploadedFiles = []) => {
  const finalResults = [];
  let successCount = 0;

  const uploadFileLength = uploadedFiles.length

  for (let i = 0; i < uploadFileLength; i++) {
    const fileObject = uploadedFiles[i]
    const {finalName, finalPath} = getFileInfo(fileObject.name);

    try {
      await fileObject.mv(finalPath);
      successCount ++;
      finalResults.push(handleResponse("success", finalName, null));

    } catch(err) {
      finalResults.push(handleResponse("failed", null, err));
    }
  }

  return finalResults
}

module.exports = {
  uploadSingleFileService,
  uploadMultipleFilesService
};
