const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const cors = require("cors");

//
const fileUpload = require("express-fileupload");

router.use(cors());
//

const User = require("../models/User");
const { json } = require("express");

router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) {
      return res.status(400).json({ message: "no email" });
    }
    if (!password) {
      return res.status(400).json({ message: "no password" });
    }
    const userToFind = await User.find({ email: email });
    if (userToFind === []) {
      return res.status(400).json({ message: "email already used" });
    }
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    const token = uid2(64);

    const newUser = new User({
      email: email,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    const userSendBack = {
      email: email,
      token: token,
    };

    res.json(userSendBack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userToFind = await User.findOne({ email: email });
    // console.log(userToFind);
    if (userToFind === []) {
      return res.status(400).json({ message: "incorrect" });
    }

    const passwordToTrySaltHashed = SHA256(userToFind.salt + password).toString(
      encBase64
    );

    if (passwordToTrySaltHashed === userToFind.hash) {
      const userResponse = {
        _id: userToFind._id,
        token: userToFind.token,
      };
      res.json(userResponse);
    } else {
      res.status(400).json({ message: "incorrecti" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ne pas oublier ça !

module.exports = router;
