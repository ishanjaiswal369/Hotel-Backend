const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("Data Fetched");
      res.status(201).json(data);
    } catch (err) {
      console.error("Error saving person:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get('/:worktype', async(req,res) =>{
    try{
      const worktype = req.params.worktype;
      if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
        const response = await Person.find({work: worktype})
        console.log("Data Fetched");
        res.status(201).json(response);
      }
    }catch(err){
      console.error("Error saving person:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  })

  module.exports = router;