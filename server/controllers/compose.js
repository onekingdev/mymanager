 const { Compose } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
 var moment = require("moment");
const cron = require('node-cron');


exports.addCompose = asyncHandler(async (req, res) => {
  try {

    const ComposeDetail = req.body
    if (req.file) {
      const url = await GoogleCloudStorage.upload(req.file);
      ComposeDetail.media_img = url
    }
     const Jobj = new Compose(ComposeDetail);
    await Jobj.save(async (err, data) => {
      if (err) {
        return res.send({ msg: err.message, success: false });
      } else {
        res.send({
          msg: "Compose created successfully",
          success: true,
         });
      }
    });

  } catch (error) {
    return res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
})
 
exports.getCompose = asyncHandler(async (req, res) => {
  try {

    const data = await Compose.find({ workspaceId: req.params.id });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});
exports.viewoneCompose = asyncHandler(async (req, res) => {
  try {
     const data = await Compose.findOne({ _id: req.params.id });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ success: false, message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.delCompose = asyncHandler(async(req, res) => {
  try {
    let result = await Compose.deleteOne({ _id: req.params.id });
    res.send({ msg: "deleted succesfully", success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.updateCompose =asyncHandler( async (req, res) => {
  try {
    const Obj = req.body;
    const data = await Compose.findOneAndUpdate({ _id: req.params.id }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `compose not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
})

exports.fbSchdulePost = asyncHandler(async (req, res) => {
  const axios = require('axios');
 
  const { page_id, access_token, message, date, time, publish } = req.body;


  if (publish && (!date || !time)) {
    // Handle the case where date or time is missing for scheduled post
    console.error('Error scheduling post: Date and time are required for scheduled posts.');
    res.status(400).json({
      status: false,
      msg: 'Date and time are required for scheduled posts.'
    });
    return;
  }

  const scheduledTime = publish ? Math.floor(new Date(`${date} ${time}`).getTime() / 1000) : null;
  const postData = {
    message: message,
    published: !publish, // If publish is true, post will be scheduled and not published immediately
    scheduled_publish_time: scheduledTime, // Schedule post for the specified date and time
    page_id: req.body.page_id,
    access_token: req.body.access_token,
    composeId: req.body.composeId

  };

  // Make the API request to schedule the post
  axios.post(`https://graph.facebook.com/v12.0/${page_id}/feed`, postData, {
    params: {
      access_token: access_token
    }
  }).then(response => {
    console.log('Post scheduled:', response.data);
    const compose = new Compose({
      compose_id: response.data.id // Save the compose ID in the database
    });
 
    compose.save().then(() => {
      console.log('Compose ID saved in database');
      res.status(200).json({
        status: true,
        msg: 'Post scheduled successfully.'
      });
    }).catch(error => {
      console.error('Error saving compose ID in database:', error);
      res.status(500).json({
        status: false,
        msg: 'Error saving compose ID in database.'
      });
    });
  }).catch(error => {
    console.error('Error scheduling post:', error);
    res.status(500).json({
      status: false,
      msg: 'Error scheduling post.'
    });
  });
})


 

 