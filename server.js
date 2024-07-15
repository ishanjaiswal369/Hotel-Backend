const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
const Menu = require("./models/menu");

const personRoutes = require("./routes/personRoutes");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/person", personRoutes);

app.post("/menu", async (req, res) => {
  try {
    const newMenuData = req.body;
    const newMenu = new Menu(newMenuData);
    const savedMenu = await newMenu.save();
    console.log("Saved menu to database");
    res.status(201).json(savedMenu);
  } catch (err) {
    console.log("Error saving menu:", err);
    res.status(505).json({ error: "Internal server error" });
  }
});

app.get("/menu", async (req, res) => {
  try {
    const data = await Menu.find();
    console.log("menu Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("App is listening on Port 3000");
});
