const { TemplateFolder } = require("../models/index/index");

exports.createfolder = async (req, res) => {
  try {
    let userId = req.user._id;
    let folderObj = new TemplateFolder({
      folderName: req.body.folderName,
      userId: userId,
    });
    folderObj.save((err, folder) => {
      if (err) {
        res.send({ msg: "Folder name already exist!", success: false });
      } else {
        res.send({
          msg: "Folder created successfully",
          success: true,
        });
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.readfolder = async (req, res) => {
  try {
    TemplateFolder.find({ userId: req.user._id })
      .populate("subFolder")
      .populate("template")
      .exec((err, list) => {
        if (err) {
          res.send({ error: "template folder is not find" });
        } else {
          var opts = {
            path: "subFolder.template",
          };
          TemplateFolder.populate(list, opts, function (err, folderList) {
            res.send(folderList);
          });
        }
      });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.editFolder = async (req, res) => {
  const { folderId } = req.params;
  try {
    TemplateFolder.updateOne({ _id: folderId, userId: req.user._id }, { $set: req.body }).exec(
      (err, updateFolder) => {
        if (updateFolder.modifiedCount < 1) {
          res.send({ msg: "Folder not updated!", success: false });
        }
        res.send({ msg: "Folder update successfully", success: true });
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.removeFolder = (req, res) => {
  const { folderId } = req.params;
  try {
    TemplateFolder.findOneAndRemove(
      { _id: folderId, userId: req.user._id },
      async (err, removeFolder) => {
        if (err) {
          res.send({ success: false, msg: "Document folder not removed" });
        }
        return res.send({ success: true, msg: "Document folder  removed" });
      }
    );
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
