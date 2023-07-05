const Video = require("../models/Video");

exports.CreateVideo = async (req, res) => {
  try {
    const newVideo = new Video({
      title: req.body.title,
    })
    await newVideo.save();
    return res.json(newVideo);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.GetVideos = async (req, res) => {
  const { userId } = req.params;
  try {
    const videos = await Video.find({ userId });
    return res.status(200).json(videos);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
}