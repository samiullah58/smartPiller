const { Maintains, validate } = require("../model/maintains");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const maintains = await Maintains.find();
  res.send(maintains);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { propertyName, units, issue, issueStatus, phoneNumber, details } =
    req.body;

  const maintains = await new Maintains({
    propertyName: propertyName,
    units: units,
    issue: issue,
    issueStatus: issueStatus,
    phoneNumber: phoneNumber,
    details: details,
  });
  await maintains.save();
  res.json({
    message: "Maintains has been added successfuly.",
    data: maintains,
  });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const maintains = await Maintains.findByIdAndUpdate(
    req.params.id,
    {
      propertyName: req.body.propertyName,
      units: req.body.units,
      issue: req.body.issue,
      issueStatus: req.body.issueStatus,
      phoneNumber: req.body.phoneNumber,
      details: req.body.details,
    },
    {
      new: true,
    }
  );
  if (!maintains)
    return res.status(404).send("Maintains not found with the given id.");
  res.json({
    message: "Maintains has been updated successfuly. ",
    data: maintains,
  });
});

router.get("/:id", async (req, res) => {
  const maintains = await Maintains.findById(req.params.id);
  if (!maintains)
    return res.status(404).send("Maintains not found with the given id.");
  res.json({ data: maintains });
});

router.delete("/:id", async (req, res) => {
  const maintians = await Maintains.findByIdAndDelete(req.params.id);
  if (!maintians)
    return res.status(404).send("Maintains not found with the given id.");
  res.json({ message: "Miantains has been deleted successfuly." });
});

module.exports = router;
