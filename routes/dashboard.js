const { Dashboard, validate } = require("../model/dashboard");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const dashboard = await Dashboard.find();
  res.json({ data: dashboard });
});

module.exports = router;
