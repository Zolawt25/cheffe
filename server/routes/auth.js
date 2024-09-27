const express = require("express");
const user = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const users = await user.create(req.body);
    res.status(201).json({ users });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ email: "email already used" });
    }
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username)
      return res.status(500).json({ username: "you must include username" });
    if (!password)
      return res.status(500).json({ password: "you must include password" });
    const users = await user.findOne({ username });
    if (!users) return res.status(500).json({ username: "username not found" });
    const comparePassword = await users.compare(password);
    if (!comparePassword)
      return res.status(500).json({ password: "incorrect password" });
    // const token = await user.createToken()
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
