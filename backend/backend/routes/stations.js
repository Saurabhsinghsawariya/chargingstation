const express = require('express');
const Station = require('../models/Station');
const router = express.Router();

// Create Station
router.post('/', async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Invalid station data' });
  }
});

// Get All Stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find();
    res.json({ data: stations });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

// Update Station
router.put('/:id', async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Invalid update data' });
  }
});

// Delete Station
router.delete('/:id', async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

module.exports = router;
