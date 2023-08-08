const { Dashboard, validate } = require("../model/dashboard");
const Property = require("../model/property");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  //   console.log();
  const dashboard = await Dashboard.find();
  res.json({ data: Property.length });
});

module.exports = router;
