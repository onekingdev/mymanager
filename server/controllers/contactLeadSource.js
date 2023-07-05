const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const { ContactLeadSource } = require("../models/index");


const initialSources = {
    "Facebook Ad":"primary",
    "Google Search":"secondary",
    "Newspaper":"warning",
    "Flyer":"danger",
    "Social Media":"info",
    "Referral":"success",
    "Other":"light-secondary"
}

exports.createSource = asyncHandler(async (req, res) => {
    try {
      const { title, color } = req.body;
      const userId = req.user._id;
  
      const initSource = new ContactLeadSource({
        title,
        color,
        userId: mongoose.Types.ObjectId(userId),
      });
  
      initSource.save((err, success) => {
        if (err) {
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        } else {
          return res.status(200).json({
            success,
          });
        }
      });
    } catch (err) {
      return res.status(500).json({
        errors: { common: { msg: err.message } },
      });
    }
  });


exports.getSources = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
      const sourceList = await ContactLeadSource.find({
        isDelete: false,
        userId: mongoose.Types.ObjectId(userId),
      });
      if (sourceList.length > 0) {
        return res.status(200).send(sourceList);
      } else {
        let data = [];
        for (key in initialSources) {
          const initSource = new ContactLeadSource({
            title: key,
            color: initialSources[key],
            userId: mongoose.Types.ObjectId(userId),
          });
          initSource.save((err, success) => {
            if (err) {
              return res.status(500).json({
                errors: { common: { msg: err.message } },
              });
            }
          });
          data.push(initSource);
        }
        return res.status(200).send(data);
      }
    } catch (err) {
      return res.status(500).json({
        errors: { common: { msg: err } },
      });
    }
  });
  
  exports.deleteSource = asyncHandler(async (req,res)=>{
      try {
          const {id} = req.params
          await ContactLeadSource.findByIdAndUpdate(mongoose.Types.ObjectId(id),{isDelete:true});
          return res.status(200).json({
              msg: {
                comment: "succcessfully deleted",
              },
            });
      } catch (err) {
          return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
      }
  })

  exports.updateSource = asyncHandler(async (req,res)=>{
    try {
        const {id} = req.params
        let payload = {...req.body,isDelete:false}
        await ContactLeadSource.findByIdAndUpdate(mongoose.Types.ObjectId(id),payload);
        return res.status(200).json({
            msg: {
              comment: "succcessfully updated",
            },
          });
    } catch (err) {
        return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
    }
})
