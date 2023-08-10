const express = require("express");
const { User } = require("../model/signUp");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email or password is incorrect...!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("email or password is incorrect...");

  const token = user.generateAuthToken();

  res.json({
    message: "User logged in successfuly",
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
      role: user.role,
    },
    token,
  });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
  });
  return schema.validate(req);
}

module.exports = router;
