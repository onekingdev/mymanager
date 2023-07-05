const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
 const { File } = require("../models/index/index");
 const asyncHandler = require("express-async-handler");
 const mongoose = require("mongoose");

const pizzip = require("pizzip");
const fetch = require("node-fetch");
const Docxtemplater = require("docxtemplater");
const DocxMerger = require("docx-merger");

exports.uploadFile = asyncHandler(async (req, res) => {
  try {
    const user = req.user
    const{organization} = req.headers
    let url = "";
    if (req.file.size) {
      url = await GoogleCloudStorage.upload(req.file);
    }

    const newFile = new File({
      userId: user._id,
      filename: req.file.originalname,
      type: req.body.type === "directory" ? "directory" : req.file.mimetype,
      size: req.file.size,
      url: url,
      path: req.body.path,
      lastSeen: new Date(),
      organizationId:organization?mongoose.Types.ObjectId(organization):null,
      creatorType:organization?user.organizations.find(x=>x.organizationId.toString()===organization).userType:user.userType
    });
    await newFile.save();
    return res.json(newFile);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getFiles = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const {  path } = req.body;
    const {organization} = req.headers
    const files = await File.find({ userId:user._id, path , organizationId:organization?mongoose.Types.ObjectId(organization):null });
    return res.json(files);
  } catch (err) {
    return res.status(400).send({ msg: err.message.replsace(/"/g, ""), success: false });
  }
});

exports.addNewFolder = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { path, name } = req.body;
    const {organization} = req.headers;

    const oldFolder = await File.findOne({
      path,
      filename: name,
      type: "directory",
    });

    if (oldFolder) {
      return res.status(400).send({ msg: "Folder with same name already exist" });
    }

    const newFolder = new File({
      userId: user._id,
      filename: name,
      type: "directory",
      path: path,
      lastSeen: new Date(),
      organizationId:organization?mongoose.Types.ObjectId(organization):null,
      creatorType:organization?user.organizations.find(x=>x.organizationId.toString()===organization).userType:user.userType
    });
    await newFolder.save();

    res.status(200).json({ msg: "success" });
  } catch (err) {
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.renameFolder =asyncHandler(async (req, res) => {
  try {
    const { fileId } = req.params;
    const { folderName } = req.body;
    await File.findByIdAndUpdate(fileId, {
      filename: folderName,
    });
    return res.json({ succes: true, msg: "folder name updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteFolder = asyncHandler(async (req, res) => {
  try {
    const { fileId } = req.params;

    await File.findByIdAndRemove(fileId);
    return res.json({ succes: true, msg: "folder deleted successfully" });
  } catch (err) {
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.mergeFile =asyncHandler(async (req, res) => {
  try {
    const { fileUrl, replaceFields } = req.body;
    let docs = [];
    for (field of replaceFields) {
      docs.push(replaceField(fileUrl, field));
    }
    const result = await Promise.all(docs);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

const replaceField =asyncHandler(async (url, field) => {
  let response = await fetch(url);
  response = await response.buffer();
  const zip = new pizzip(response);
  const doc = new Docxtemplater(zip, { linebreaks: true });
  doc.render(field);
  let buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  return buf;
});
