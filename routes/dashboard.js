const { Dashboard, validate } = require("../model/dashboard");
const { Property } = require("../model/property");
const { LeaseProperty } = require("../model/leaseProperty");
const { Maintains } = require("../model/maintains");
const { Tenants } = require("../model/tenants");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const property = await Property.find();
  const leaseProperty = await LeaseProperty.find();
  const maintains = await Maintains.find();
  const tenants = await Tenants.find();
  res.json({
    data: {
      totalProperty: property.length,
      totalLeaseProperty: leaseProperty.length,
      totalMaintains: maintains.length,
      totalTenants: tenants.length,
    },
  });
});

module.exports = router;
