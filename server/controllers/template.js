const { Template, TemplateSubfolder, TemplateFolder } = require("../models/index/index");

exports.templateUpload = async (req, res) => {
  const userId = req.user._id;
  const { folderId } = req.params;
  const { subfolderId } = req.body;
  try {
    const docFileDetails = {
      templateName: req.body.templateName,
      text: req.body.text,
      userId: userId,
    };
    const mydoc = new Template(docFileDetails);
    mydoc.save((err, docdata) => {
      if (err) {
        res.send({ msg: "template is not added", success: false });
      } else {
        if (subfolderId) {
          TemplateSubfolder.findOneAndUpdate(
            { _id: subfolderId },
            { $push: { template: docdata._id } }
          ).exec((err, updateFolder) => {
            if (err) {
              res.send({ msg: "template is not added", success: false });
            } else {
              return res.send({ msg: "template created successfully", success: true });
            }
          });
        } else {
          TemplateFolder.findOneAndUpdate(
            { _id: folderId },
            { $push: { template: docdata._id } }
          ).exec((err, updateFolder) => {
            if (err) {
              res.send({ msg: "template is not added", success: false });
            } else {
              return res.send({ msg: "template created successfully", success: true });
            }
          });
        }
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.editTemplate = (req, res) => {
  try {
    Template.updateOne({ _id: req.params.templateId }, { $set: req.body }).exec(
      (err, updateTemplate) => {
        if (err) {
          return res.send({ msg: "unable to update template", success: false });
        } else {
          return res.send({ msg: "template updated successfully", success: true });
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

exports.templateRemove = (req, res) => {
  const { templateId, folderId, subfolderId } = req.params;

  try {
    Template.findOneAndRemove({ _id: templateId }, function (err, updateDoc) {
      if (err) {
        res.send({ msg: "Template not removed", success: false });
      } else {
        if (subfolderId !== "undefined") {
          TemplateSubfolder.updateOne(
            { _id: subfolderId },
            { $pull: { template: templateId } },
            function (err, temp) {
              if (err) {
                res.send({
                  msg: "Template not removed",
                  success: false,
                });
              } else {
                res.send({
                  msg: "Template removed successfully",
                  success: true,
                });
              }
            }
          );
        } else {
          TemplateFolder.updateOne(
            { _id: folderId },
            { $pull: { template: templateId } },
            function (err, temp) {
              if (err) {
                res.send({
                  msg: "Template not removed",
                  success: false,
                });
              } else {
                res.send({
                  msg: "Template removed successfully",
                  success: true,
                });
              }
            }
          );
        }
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
};
