const { Property, validate } = require("../model/leaseProperty");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const property = await Property.find();
  res.send(property);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    propertyName,
    numberOfUnits,
    city,
    address,
    leaseStartDate,
    leaseEndDate,
    leaseAmount,
    item,
    generalRent,
    securityDeposit,
    lateFee,
    incidentReceipt,
    rentType,
    description,
    image
  } = req.body;

  const property = new Property({
    propertyName: propertyName,
    numberOfUnits: numberOfUnits,
    city: city,
    address: address,
    leaseStartDate: leaseStartDate,
    leaseEndDate: leaseEndDate,
    leaseAmount: leaseAmount,
    item: item,
    generalRent: generalRent,
    securityDeposit: securityDeposit,
    lateFee: lateFee,
    incidentReceipt: incidentReceipt,
    rentType: rentType,
    description: description,
    image: image,
  });

  await property.save();
  res.json({ message: "property added successfuly.", property });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      propertyName: req.body.propertyName,
      numberOfUnits: req.body.numberOfUnits,
      city: req.body.city,
      address: req.body.address,
      leaseStartDate: req.body.leaseStartDate,
      leaseEndDate: req.body.leaseEndDate,
      leaseAmount: req.body.leaseAmount,
      item: req.body.item,
      generalRent: req.body.generalRent,
      securityDeposit: req.body.securityDeposit,
      lateFee: req.body.lateFee,
      incidentReceipt: req.body.incidentReceipt,
      rentType: req.body.rentType,
      description: req.body.description,
      image: req.body.image,
    },
    { new: true }
  );
  if (!property)
    return res.status(404).send("Propert not found with the given id");
  res.send(property);
});

router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property)
    return res.status(404).send("Property not found with the given id.");
  res.send(property);
});

router.delete("/:id", async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property)
    return res.status(404).send("Property not found with the given id.");
  res.send("Property has been deleted successfuly.");
});

module.exports = router;
