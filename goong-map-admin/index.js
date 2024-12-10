const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/locations_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Mongoose Schema & Model
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  request_sender: { type: String, required: true },
  request_type: { type: String, required: true },
  status: { type: String, required: true },
  number_people: { type: Number, required: true },
  phone_number: { type: String, required: true },
  date: { type: String, required: true },
  phone_org: { type: String, required: true },


});

const Location = mongoose.model('Location', locationSchema);

// Routes

// 1. Get all locations
app.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
});

// 2. Add a new location
app.post('/locations', async (req, res) => {
  const { name, latitude, longitude, request_sender, request_type, status, number_people, phone_number,
    date, phone_org
  } = req.body;

  if (!name || latitude == null || longitude == null || !request_sender 
    || !request_type || !status || !number_people || !phone_number || !date || !phone_org) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newLocation = new Location({ name, latitude, longitude, request_sender, request_type, status, number_people, 
      phone_number, date, phone_org});
    await newLocation.save();
    res.status(201).json({ message: 'Location added successfully', location: newLocation });
  } catch (error) {
    res.status(500).json({ message: 'Error adding location', error });
  }
});

// 3. Get a single location by ID
app.get('/locations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error });
  }
});

// 4. Update a location by ID
app.put('/locations/:id', async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, request_sender, request_type, status, number_people, phone_number, date, phone_org} = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, latitude, longitude, request_sender, request_type, status, number_people, 
        phone_number, date, phone_org },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json({ message: 'Location updated successfully', location: updatedLocation });
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error });
  }
});

// 5. Delete a location by ID
app.delete('/locations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json({ message: 'Location deleted successfully', location: deletedLocation });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting location', error });
  }
});

// 6. Get locations by Phone_org
app.get('/locations/phone_org/:phone_org', async (req, res) => {
  const { phone_org } = req.params;

  try {
    const location = await Location.find({ phone_org }); // Tìm location theo phone_org
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
