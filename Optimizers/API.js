const express = require('express');
const router = express.Router();
const Drug = require('../models/drug');

// Get all drugs
router.get('/', async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new drug
router.post('/', async (req, res) => {
  const drug = new Drug({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    category: req.body.category,
    imageURL: req.body.imageURL
  });

  try {
    const newDrug = await drug.save();
    res.status(201).json(newDrug);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Get a single drug by ID
router.get('/:id', getDrug, (req, res) => {
  res.json(res.drug);
});

// Update a drug by ID
router.put('/:id', getDrug, async (req, res) => {
  if (req.body.name != null) {
    res.drug.name = req.body.name;
  }
  if (req.body.manufacturer != null) {
    res.drug.manufacturer = req.body.manufacturer;
  }
  if (req.body.price != null) {
    res.drug.price = req.body.price;
  }
  if (req.body.quantity != null) {
    res.drug.quantity = req.body.quantity;
  }
  if (req.body.description != null) {
    res.drug.description = req.body.description;
  }
  if (req.body.category != null) {
    res.drug.category = req.body.category;
  }
  if (req.body.imageURL != null) {
    res.drug.imageURL = req.body.imageURL;
  }

  try {
    const updatedDrug = await res.drug.save();
    res.json(updatedDrug);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a drug by ID
router.delete('/:id', getDrug, async (req, res) => {
  try {
    await res.drug.remove();
    res.json({ message: 'Drug deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a drug by ID
async function getDrug(req, res, next) {
  try {
    drug = await Drug.findById(req.params.id);
    if (drug == null) {
      return res.status(404).json({ message: 'Cannot find drug' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }

  res.drug = drug;
  next();
}

module.exports = router;// JavaScript source code
