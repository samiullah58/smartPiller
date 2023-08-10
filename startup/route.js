const express = require("express");
const properties = require("../routes/property");
const leaseProperty = require("../routes/leaseProperty");
const tenants = require("../routes/tenants");
const maintains = require("../routes/maintains");
const dashboard = require("../routes/dashboard");
const users = require("../routes/singUp");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/property", properties);
  app.use("/api/signup", users);
  app.use("/api/auth", auth);
  app.use("/api/leaseProperty", leaseProperty);
  app.use("/api/tenants", tenants);
  app.use("/api/maintains", maintains);
  app.use("/api/dashboard", dashboard);
};
