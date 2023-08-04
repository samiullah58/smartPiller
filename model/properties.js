const mongoose = require("mongoose");
const Joi = require("joi");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  unitName: {
    type: Number,
    required: true,
  },
  bedRoom: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  kitchen: {
    type: Number,
    required: true,
  },
  generalRent: {
    type: Number,
    required: true,
  },
  securityDeposit: {
    type: Number,
    required: true,
  },
  lateFee: {
    type: Number,
    required: true,
  },
  incidentReceipt: {
    type: Number,
    required: true,
  },
  rentType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  propertyImage: {
    name: String,
    imageData: Buffer,
  },
});

const Properties = new mongoose.model("Properties", propertySchema);

function validationProperty(property) {
  const schema = Joi.object({
    name: Joi.string().required(),
    units: Joi.number().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    unitName: Joi.number().required(),
    bedRoom: Joi.number().required(),
    baths: Joi.number().required(),
    kitchen: Joi.number().required(),
    generalRent: Joi.number().required(),
    securityDeposit: Joi.number().required(),
    lateFee: Joi.number().required(),
    incidentReceipt: Joi.number().required(),
    rentType: Joi.string().required(),
    description: Joi.string().required(),
    propertyImage: Joi.required(),
  });
  return schema.validate(property);
}

module.exports.Property = Properties;
module.exports.validate = validationProperty;
