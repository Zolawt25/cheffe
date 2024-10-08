const express = require("express");
const user = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

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

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  // Create a dummy user id for the sake of this example
  const id = "66f72f69d06926a36a2b46c1";

  // Generate a JWT token with an expiration of 30 days
  const token = jwt.sign({ id: id }, "efuweiuweoiwejf98r894309", {
    expiresIn: "30d",
  });

  // Create the transporter for sending emails
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zelalemt2525@gmail.com",
      pass: "mejycibszbqrxpin",
    },
  });

  // Define mail options (where to send, subject, and content)
  var mailOptions = {
    from: "zelalemt2525@gmail.com",
    to: email, // Send to user's email
    subject: "Reset your password",
    text: `Click here to reset your password: https://cheffe.vercel.app/login/reset-password/${id}/${token}`,
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error sending email", error });
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    jwt.verify(token, "efuweiuweoiwejf98r894309", (err, decoded) => {
      if (err) {
        return res.json({ status: "error with token" });
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          user
            .findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ status: "success!" }))
            .catch((err) => res.send({ status: err }));
        });
      }
    });
  } catch (error) {}
});

module.exports = router;
