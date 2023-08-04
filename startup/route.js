const express = require("express");
const properties = require("../routes/properties");
const users = require("../routes/user");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/properties", properties);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
