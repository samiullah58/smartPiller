const mongoose = require("mongoose");
const Joi = require("joi");

const maintainsSchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  issueStatus: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const Maintains = new mongoose.model("Maintains", maintainsSchema);

function validateMaintains(maintains) {
  const schema = Joi.object({
    propertyName: Joi.string().required(),
    units: Joi.number().required(),
    issue: Joi.string().required(),
    issueStatus: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    details: Joi.string().required(),
  });
  return schema.validate(maintains);
}

module.exports.Maintains = Maintains;
module.exports.validate = validateMaintains;
