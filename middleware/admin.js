const user = require("../model/user");
module.exports = function (req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send("Access Denied! Not an Admin.");
  }

  next();
};
