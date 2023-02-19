const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

// import de mes routes :
const personnagesRoute = require("./routes/personnages");
const personnagesdetailsRoute = require("./routes/personnagesdetails");
const comicsRoute = require("./routes/comics");
const favoriteRoute = require("./routes/favorite");
const favcomicsRoute = require("./routes/favoriteComics");
const userRoute = require("./routes/user");
//

// je les utilise
app.use(personnagesRoute);
app.use(personnagesdetailsRoute);
app.use(favoriteRoute);
app.use(comicsRoute);
app.use(favcomicsRoute);
app.use(userRoute);
//

// ROUTES DE BASE

app.get("/", (req, res) => {
  res.json({ message: "Hello you !" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("SERVER STARTED");
});
