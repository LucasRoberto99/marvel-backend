const express = require("express");

const fileUpload = require("express-fileupload");

const router = express.Router();

require("dotenv").config();

// faut il use cors dans chaques routes ?
const cors = require("cors");

router.use(cors());
//

// import du modèle mongoose
const Favcomics = require("../models/FavComics");
//

router.post("/favorites-comics/add", fileUpload(), async (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const desc = req.body.desc;
    const url = req.body.url;
    // console.log(req.body);
    // console.log(req.body);
    const isIdAlreadyIn = await Favcomics.find({ id: id });
    // console.log(isIdAlreadyIn);
    if (isIdAlreadyIn.length === 0) {
      // console.log("new");

      const newFavComics = new Favcomics({
        id: id,
        title: title,
        desc: desc,
        url: url,
      });
      await newFavComics.save();
    } else {
      const idToDelete = isIdAlreadyIn[0]._id;
      await Favcomics.findByIdAndDelete(idToDelete);
      return res.json({ message: "favcomics deleted" });
    }
    res.json("ok");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/favorites-comics", async (req, res) => {
  try {
    const favoritesComicList = await Favcomics.find();

    res.json(favoritesComicList);
  } catch (error) {
    console.log(error.message);
  }
});

// ne pas oublier ça !

module.exports = router;
