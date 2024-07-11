const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");

const Person = require("./models/person");
const Menu = require("./models/menu");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body;
//     const person = new Person(data);
//     const response = await person.save();
//     console.log("Response Data Saved");
//     res.send(200).json(response);
//   } catch (err) {
//     console.error("Error Saving Data", err);
//     res.status(500).json({ message: "Error Saving Data" });
//   }
// });

app.post("/person", async (req, res) => {
  try {
    const newPersonData = req.body;
    const newPerson = new Person(newPersonData);
    // Save the new person to the database using await
    const savedPerson = await newPerson.save();
    console.log("Saved person to database");
    res.status(201).json(savedPerson);
  } catch (error) {
    console.error("Error saving person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(201).json(data);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json({ error: "Internal server error" });
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
