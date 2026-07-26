const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

const user = new User({
  name,
  email,
  password: hashedPassword,
});

    await user.save();

    console.log("User Saved Successfully");

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log("Signup Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
  password,
  user.password
);


if (!isMatch) {
  return res.status(400).json({
    message:"Invalid Password",
  });
}

    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;