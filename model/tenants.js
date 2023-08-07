const Joi = require("joi");
const mongoose = require("mongoose");

const tenantsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    require: true,
  },
  job: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  familyNumber: {
    type: Number,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  rentPaid: {
    type: String,
    required: true,
  },
  currentRent: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Tenants = new mongoose.model("Tenants", tenantsSchema);

function validateTenants(tenants) {
  const schema = Joi.object({
    image: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    contactNumber: Joi.number().required(),
    job: Joi.string().required(),
    age: Joi.number().required(),
    familyNumber: Joi.number().required(),
    property: Joi.string().required(),
    unit: Joi.number().required(),
    rentPaid: Joi.string().required(),
    currentRent: Joi.number().required(),
    status: Joi.string().required(),
  });
  return schema.validate(tenants);
}

module.exports.Tenants = Tenants;
module.exports.validate = validateTenants;
