const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Station name is required'],
    trim: true,
  },
  location: {
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: -180,
      max: 180,
    }
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  powerOutput: {
    type: Number,
    required: [true, 'Power output is required'],
    min: 0,
  },
  connectorType: {
    type: String,
    required: [true, 'Connector type is required'],
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Station', stationSchema);
