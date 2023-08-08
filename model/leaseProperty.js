const mongoose = require("mongoose");
const Joi = require("joi");

const leasePropertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  numberOfUnits: {
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
  leaseStartDate: {
    type: Date,
    required: true,
  },
  leaseEndDate: {
    type: Date,
    required: true,
  },
  leaseAmount: {
    type: Number,
    required: true,
  },
  item: [
    {
      unitName: {
        type: String,
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
    },
  ],
  generalRent: {
    type: Number,
    required: true,
  },
  securityDeposit: {
    type: Number,
    required: true,
  },
  lateFee: {
    type: String,
    required: true,
  },
  incidentReceipt: {
    type: String,
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
  image: {
    type: String,
    required: true,
  },
});

const LeaseProperty = new mongoose.model("LeaseProperty", leasePropertySchema);

function validationleaseProperty(leaseProperty) {
  const schema = Joi.object({
    propertyName: Joi.string().required(),
    numberOfUnits: Joi.number().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    leaseStartDate: Joi.date().required(),
    leaseEndDate: Joi.date().required(),
    leaseAmount: Joi.number().required(),
    item: Joi.array().required(),
    generalRent: Joi.number().required(),
    securityDeposit: Joi.number().required(),
    lateFee: Joi.number().required(),
    incidentReceipt: Joi.string().required(),
    rentType: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });
  return schema.validate(leaseProperty);
}

module.exports.LeaseProperty = LeaseProperty;
module.exports.validate = validationleaseProperty;
