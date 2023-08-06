const mongoose = require("mongoose");
const Joi = require("joi");

const propertySchema = new mongoose.Schema({
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
  item: [{
    unitName: {
      type: String,
      required: true
    },
      bedRoom: {
        type: Number,
        required: true
      },
      baths: {
        type: Number,
        required: true
      },
      kitchen: {
        type: Number,
        required: true
      }
    }],
    generalRent: {
      type: Number,
      required: true
    },
    securityDeposit: {
      type: Number,
      required: true
    },
    lateFee: {
      type: Number,
      required: true
    },
    incidentReceipt: {
      type: String,
      required: true
    },
    rentType: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
});

const Properties = new mongoose.model("Properties", propertySchema);

function validationProperty(property) {
  const schema = Joi.object({
    propertyName: Joi.string().required(),
    numberOfUnits: Joi.number().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    item: Joi.array().required(),
    generalRent: Joi.number().required(),
    securityDeposit: Joi.number().required(),
    lateFee: Joi.number().required(),
    incidentReceipt: Joi.string().required(),
    rentType: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
  });
  return schema.validate(property);
}

module.exports.Property = Properties;
module.exports.validate = validationProperty;
