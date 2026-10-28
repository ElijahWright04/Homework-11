const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Data Store for Native Plant App
let plants = [
    { id: 1, name: 'Purple Coneflower', scientificName: 'Echinacea purpurea', sunlight: 'Full Sun', bloomSeason: 'Summer' },
    { id: 2, name: 'Butterfly Weed', scientificName: 'Asclepias tuberosa', sunlight: 'Full Sun', bloomSeason: 'Summer' },
    { id: 3, name: 'Wild Bergamot', scientificName: 'Monarda fistulosa', sunlight: 'Full Sun to Part Shade', bloomSeason: 'Summer' }
];

// 1. GET /plants - Retrieve all plants
app.get('/plants', (req, res) => {
    res.json(plants);
});

// 2. GET /plants/:id - Retrieve a specific plant by ID
app.get('/plants/:id', (req, res) => {
    const plant = plants.find(p => p.id === parseInt(req.params.id));
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
});

// 3. POST /plants - Create a new plant record
app.post('/plants', (req, res) => {
    const newPlant = {
        id: plants.length > 0 ? plants[plants.length - 1].id + 1 : 1,
        name: req.body.name,
        scientificName: req.body.scientificName,
        sunlight: req.body.sunlight,
        bloomSeason: req.body.bloomSeason
    };
    plants.push(newPlant);
    res.status(201).json(newPlant);
});

// 4. PUT /plants/:id - Update an existing plant record
app.put('/plants/:id', (req, res) => {
    const plant = plants.find(p => p.id === parseInt(req.params.id));
    if (!plant) return res.status(404).json({ message: 'Plant not found' });

    plant.name = req.body.name || plant.name;
    plant.scientificName = req.body.scientificName || plant.scientificName;
    plant.sunlight = req.body.sunlight || plant.sunlight;
    plant.bloomSeason = req.body.bloomSeason || plant.bloomSeason;

    res.json(plant);
});

// 5. DELETE /plants/:id - Delete a plant record
app.delete('/plants/:id', (req, res) => {
    const index = plants.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Plant not found' });

    const deletedPlant = plants.splice(index, 1);
    res.json(deletedPlant[0]);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Native Plant API Server running on port ${PORT}`);
});