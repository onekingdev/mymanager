const { TemplateSubfolder, TemplateFolder } = require("../models/index/index");

exports.createSubFolder = async (req, res) => {
  const userId = req.user._id;
  const { folderId } = req.params;
  try {
    const isExist = await TemplateFolder.find({ _id: folderId });
    if (isExist.length == 1) {
      const docSub = new TemplateSubfolder({
        subFolderName: req.body.subFolderName,
        userId: userId,
      });
      docSub.save((err, subfolder) => {
        if (err) {
          return res.send({ msg: "subfolder is not created", success: err });
        } else {
          TemplateFolder.updateOne(
            { _id: req.params.folderId },
            { $push: { subFolder: subfolder._id } }
          ).exec((err, updateFolder) => {
            if (updateFolder.modifiedCount < 1) {
              return res.send({ msg: "subfolder is not add in folder", success: false });
            }
            return res.send({ msg: "subfolder created successfully", success: true });
          });
        }
      });
    } else {
      return res.send({ msg: "folder not exist", success: false });
    }
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.editSubFolder = (req, res) => {
  const subfolderId = req.params.subfolderId;
  try {
    TemplateSubfolder.updateOne(
      { _id: subfolderId, userId: req.user._id },
      { $set: req.body }
    ).exec((err, updatesubFolder) => {
      if (updatesubFolder.modifiedCount < 1) {
        return res.send({ msg: "subfolder is not updated", success: false });
      }
      return res.send({ msg: "subfolder updated successfully", success: true });
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
exports.templateList = (req, res) => {
  try {
    TemplateSubfolder.find({ userId: req.user._id })
      .populate("template")
      .exec((err, folderList) => {
        if (err) {
          res.send({ error: "template folder is not find" });
        } else {
          res.send(folderList);
        }
      });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.removeSubFolder = (req, res) => {
  const { subfolderId } = req.params;
  const { folderId } = req.params;
  try {
    TemplateSubfolder.findOneAndRemove({
      _id: subfolderId,
      userId: req.user._id,
    }).exec((err, removeFolder) => {
      if (err) {
        res.send({ msg: "sub folder is not remove", success: err });
      } else {
        TemplateFolder.updateOne({ _id: folderId }, { $pull: { subFolder: subfolderId } }).exec(
          (err, updatesubFolder) => {
            if (updatesubFolder.modifiedCount < 1) {
              return res.send({
                msg: "subfolder deleted but not  updated in folder",
                success: false,
              });
            }
            return res.send({ msg: "subfolder deleted successfully", success: true });
          }
        );
      }
    });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};
