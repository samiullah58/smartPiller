const { Dashboard, validate } = require("../model/dashboard");
const Property = require("../model/property");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  //   console.log();
  const dashboard = await Property.find();
  res.json({ data: dashboard.length });
});

module.exports = router;
