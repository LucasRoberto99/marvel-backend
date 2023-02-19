const express = require("express");

const axios = require("axios");

const router = express.Router();

require("dotenv").config();

// faut il use cors dans chaques routes ?
const cors = require("cors");

router.use(cors());
//

router.get("/comics", async (req, res) => {
  try {
    // console.log(req.query);
    const numberToSkip = (req.query.page - 1) * 18;
    const name = req.query.name;
    // console.log(name);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&skip=${numberToSkip}&title=${name}&limit=18`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ne pas oublier ça !

module.exports = router;
