const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.verifytoken = async (req, res, next) => {
  let token = req.headers["auth-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
  console.log(process.env.TOKEN_SECRET);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unathorized!!" });
    }
    req.userId = decoded.userId;
   // console.log(req.userId);
    req.usertype = decoded.usertype;
    next();
  });
};
