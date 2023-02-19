const express = require("express");

const axios = require("axios");

const router = express.Router();

require("dotenv").config();

// faut il use cors dans chaques routes ?
const cors = require("cors");

router.use(cors());
//

router.get("/personnages/details", async (req, res) => {
  try {
    // console.log("yo");
    const id = req.query.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ne pas oublier ça !

module.exports = router;
