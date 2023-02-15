const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

// import de mes routes :
const personnagesRoute = require("./routes/personnages");
//

// je les utilise
app.use(personnagesRoute);
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
