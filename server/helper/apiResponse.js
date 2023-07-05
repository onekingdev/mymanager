exports.alreadyr = function (res) {
  var data = {
    status: false,
    message: "already exists"
  };
  return res.status(403).json(data);
};

exports.successr = function (res, data) {
  var resData = {
    status: true,
    message: "success",
    count: data.length,
    data: data
  };
  return res.status(200).json(resData);
};

exports.errorr = function (res, error) {
  var data = {
    status: false,
    message: "error",
    error: error
  };
  return res.status(400).json(data);
};

exports.deleter = function (res, data) {
  var data = {
    status: true,
    message: "deleted",
    deleteCount: data.deletedCount
  };
  return res.status(200).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    status: false,
    message: msg,
    data: data
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: false,
    message: msg
  };
  return res.status(401).json(data);
};
