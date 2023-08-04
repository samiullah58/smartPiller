const { Property, validate } = require("../model/properties");
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
    name,
    units,
    city,
    address,
    unitName,
    bedRoom,
    baths,
    kitchen,
    generalRent,
    securityDeposit,
    lateFee,
    incidentReceipt,
    rentType,
    description,
    propertyImage,
  } = req.body;

  const property = new Property({
    name: name,
    units: units,
    city: city,
    address: address,
    unitName: unitName,
    bedRoom: bedRoom,
    baths: baths,
    kitchen: kitchen,
    generalRent: generalRent,
    securityDeposit: securityDeposit,
    lateFee: lateFee,
    incidentReceipt: incidentReceipt,
    rentType: rentType,
    description: description,
    propertyImage: propertyImage,
  });

  await property.save();

  res.send(property);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      units: req.body.units,
      city: req.body.city,
      address: req.body.address,
      unitName: req.body.unitName,
      bedRoom: req.body.bedRoom,
      baths: req.body.baths,
      kitchen: req.body.kitchen,
      generalRent: req.body.generalRent,
      securityDeposit: req.body.securityDeposit,
      lateFee: req.body.lateFee,
      incidentReceipt: req.body.incidentReceipt,
      rentType: req.body.rentType,
      description: req.body.description,
      propertyImage: req.body.propertyImage,
    },
    {
      new: true,
    }
  );
  if (!property) res.status(404).send("property not found");
  res.send(property);
});

router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) res.status(404).send("property not found");
  res.send(property);
});

router.delete("/:id", async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);
  if (!property) res.status(404).send("property is not found");
  res.send("property successfuly deleted");
});

module.exports = router;
