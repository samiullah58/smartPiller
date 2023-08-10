const _ = require("lodash");
const bcrypt = require("bcrypt");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { User, validate } = require("../model/signUp");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = new User(
      _.pick(req.body, [
        "firstName",
        "lastName",
        "email",
        "contactNumber",
        "password",
      ])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(201).json({ message: "User registered successfuly" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    // console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Hash the new password if it's provided in the request body
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: req.body.password, // Updated hashed password if provided
      },
      {
        new: true,
      }
    );

    if (!user) return res.status(404).send("User not found.");
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found with the given id.");
  res.send(user);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found with the given id.");

  res.status(200).json({ message: "user deleted successfuly." });
});

module.exports = router;
