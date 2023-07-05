const asyncHandler = require("express-async-handler");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.uploadImage = asyncHandler(async (req, res) => {
    try {
      const url = await GoogleCloudStorage.upload(req.file);
      res.send({
        success: true,
        message: "Image uploaded successfully",
        url,
      });
    } catch (error) {
      res.send({ success: false, message: error.message.replace(/\\"/g, "") });
    }
  });