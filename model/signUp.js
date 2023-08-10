const jwt = require("jsonwebtoken");
const Joi = require("joi");
// const JoiPhoneNumber = require("joi-phone-number");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

// Joi.extend(JoiPhoneNumber);

// ********

// function validatePhoneNumber(phoneNumber) {
//   const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // Adjust the regex based on your phone number requirements
//   return phoneNumber.match(phoneNumberRegex) !== null;
// }

// ********

const User = new mongoose.model("User", userSchema);

// ********

function validationUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    contactNumber: Joi.string().required(),
    // .custom((value, helpers) => {
    //   if (!validatePhoneNumber(value)) {
    //     return helpers.error("any.invalid");
    //   }
    //   return value;
    // }, "Custom validation for phone number")
    // .required(),
    password: Joi.string().required().min(5).max(1024),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("confirmPassword")
      .messages({
        "any.only": "{{#label}} does not match the password",
      }),
  });

  return schema.validate(user);
}

// ********

// function validationUser(user) {
//   const schema = Joi.object({
//     firstName: Joi.string().required().min(5).max(50),
//     lastName: Joi.string().required().min(5).max(50),
//     email: Joi.string().required().email(),
//     contactNumber: Joi.string()
//       .phoneNumber({ format: "international", strict: true })
//       .required(),
//     password: Joi.string().required().min(5).max(1024),
//     confirmPassword: Joi.string()
//       .valid(Joi.ref("password"))
//       .required()
//       .label("Confirm password")
//       .messages({
//         "any.only": "{{#label}} does not match the password",
//       }),
//     isAdmin: Joi.boolean().required(),
//   });
//   return schema.validate(user);
// }

module.exports.User = User;
module.exports.validate = validationUser;
