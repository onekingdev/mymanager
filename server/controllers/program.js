const { Program } = require("../models/index/index");

const initialPrograms = [
  { title: "Little Tiger", color: "primary" },
  { title: "Personal", color: "danger" },
  { title: "Family", color: "warning" },
  { title: "Holiday", color: "success" },
  { title: "ETC", color: "info" },
];

exports.newProgram = async (req, res) => {
  try {
    const { title, color } = req.body;
    const initialProgram = new Program({
      title: title,
      color: color,
    });

    initialProgram.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        return res.status(200).json({ success: true, msg: "Program successfully created" });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getProgram = async (req, res) => {
  try {
    const labelList = await Program.find({
      isDelete: false,
    });

    if (labelList.length > 0) {
      return res.status(200).send(labelList);
    } else {
      Program.insertMany(initialPrograms)
        .then((success) => {
          console.log(success);
          return res.status(200).send(success);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err } },
    });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, title, color } = req.body;

    const labelData = await Program.find({ _id: _id });
    if (!labelData.length) {
      return res.status(404).json({
        errors: { common: { msg: `No Program data found by id: ${_id}` } },
      });
    }
    const label = labelData[0];
    label.title = title ? title : label.title;
    label.color = color ? color : label.color;

    label.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        return res.status(200).json({
          success: true,
          msg: "Program successfully updated",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error } },
    });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const { _id } = req.params;

    await Program.updateMany(
      {
        _id: _id,
      },
      {
        isDelete: true,
      }
    );
    return res.status(200).json({
      success: true,
      msg: "Succcessfully deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};
