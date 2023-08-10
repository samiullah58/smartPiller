const { Tenants, validate } = require("../model/tenants");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const tenants = await Tenants.find();
  res.send(tenants);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    image,
    firstName,
    lastName,
    contactNumber,
    job,
    age,
    familyNumber,
    property,
    unit,
    rentPaid,
    currentRent,
    status,
  } = req.body;

  const tenants = await new Tenants({
    image: image,
    firstName: firstName,
    lastName: lastName,
    contactNumber: contactNumber,
    job: job,
    age: age,
    familyNumber: familyNumber,
    property: property,
    unit: unit,
    rentPaid: rentPaid,
    currentRent: currentRent,
    status: status,
  });
  await tenants.save();
  res.json({ message: "Tenant has been added successfuly. ", data: tenants });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tenants = await Tenants.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contactNumber: req.body.contactNumber,
      job: req.body.job,
      age: req.body.age,
      familyNumber: req.body.familyNumber,
      property: req.body.property,
      unit: req.body.unit,
      rentPaid: req.body.rentPaid,
      currentRent: req.body.currentRent,
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  if (!tenants)
    return res.status(404).send("Tenants not found with the given id.");
  res.json({ message: "Tenant has been updated successfuly. " });
});

router.get("/:id", async (req, res) => {
  const tenants = await Tenants.findById(req.params.id);
  if (!tenants)
    return res.status(404).send("Tenants not found with the given id.");
  res.json({ data: tenants });
});

router.delete("/:id", async (req, res) => {
  const tenants = await Tenants.findByIdAndDelete(req.params.id);
  if (!tenants)
    return res.status(404).send("Tenants not found with the given id.");
  res.json({ message: "Tenant has been deleted successfuly." });
});

module.exports = router;
