const express = require("express");

const fileUpload = require("express-fileupload");

const router = express.Router();

require("dotenv").config();

// faut il use cors dans chaques routes ?
const cors = require("cors");

router.use(cors());
//

// import du modèle mongoose
const Favorites = require("../models/Favorites");
//

router.get("/favorites/add", fileUpload(), async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.query.title;
    const desc = req.query.desc;
    const url = req.query.url;
    // console.log(url);
    const isIdAlreadyIn = await Favorites.find({ id: id });
    // console.log(isIdAlreadyIn);
    if (isIdAlreadyIn.length === 0) {
      //   console.log("new");
      const newFavorites = new Favorites({
        id: id,
        title: title,
        desc: desc,
        url: url,
      });
      await newFavorites.save();
    } else {
      const idToDelete = isIdAlreadyIn[0]._id;
      await Favorites.findByIdAndDelete(idToDelete);
      return res.json({ message: "favorite deleted" });
    }
    res.json("ok");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const favoriteHeroList = await Favorites.find();
    // console.log(favoriteHeroList);
    res.json(favoriteHeroList);
  } catch (error) {
    console.log(error.message);
  }
});

// ne pas oublier ça !

module.exports = router;
