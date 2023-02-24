// JavaScript source code
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(://localhost/pharmacy');

const Drug = require('./models/drug');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get all drugs
app.get('/drugs', async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.send(drugs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a new drug
app.post('/drugs', async (req, res) => {
  try {
    const drug = new Drug(req.body);
    await drug.save();
    res.send(drug);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get a single drug by ID
app.get('/drugs/:id', async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    res.send(drug);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a drug by ID
app.put('/drugs/:id', async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    drug.set(req.body);
    await drug.save();
    res.send(drug);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a drug by ID
app.delete('/drugs/:id', async (req, res) => {
  try {
    const drug = await Drug.findByIdAndDelete(req.params.id);
    res.send(drug);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));