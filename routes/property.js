const { Property, validate } = require("../model/property");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.send(properties);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    propertyName,
    numberOfUnits,
    city,
    address,
    item,
    generalRent,
    securityDeposit,
    lateFee,
    incidentReceipt,
    rentType,
    description,
    image,
  } = req.body;

  const property = new Property({
    propertyName: propertyName,
    numberOfUnits: numberOfUnits,
    city: city,
    address: address,
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

  res.json({ message: "Property successfuly added", data: property });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      propertyName: req.body.propertyName,
      numberOfUnits: req.body.numberOfUnits,
      city: req.body.city,
      address: req.body.address,
      item: req.body.item,
      generalRent: req.body.generalRent,
      securityDeposit: req.body.securityDeposit,
      lateFee: req.body.lateFee,
      incidentReceipt: req.body.incidentReceipt,
      rentType: req.body.rentType,
      description: req.body.description,
      image: req.body.image,
    },
    {
      new: true,
    }
  );
  if (!property) res.status(404).send("Property not found");
  res.send(property);
});

router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) res.status(404).send("Property not found");
  res.send(property);
});

router.delete("/:id", async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) res.status(404).send("Property is not found");
  res.send("Property successfuly deleted");
});

module.exports = router;
