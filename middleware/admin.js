const user = require("../model/signUp");
module.exports = function (req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send("Access Denied! Not an Admin.");
  }

  next();
};
