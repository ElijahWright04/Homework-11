const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function runPlantDatabase() {
    let mongoServer;
    try {
        // 1. Spin up an in-memory MongoDB instance
        mongoServer = await MongoMemoryServer.create();
        const MONGO_URI = mongoServer.getUri();

        await mongoose.connect(MONGO_URI);
        console.log('Connected to In-Memory MongoDB successfully!\n');

        // 2. Define Schema & Model (20+ records required with appropriate fields)
        const plantSchema = new mongoose.Schema({
            name: { type: String, required: true },
            scientificName: { type: String, required: true },
            sunlight: String,
            soil: String,
            heightInches: Number,
            bloomSeason: String
        });

        const Plant = mongoose.model('PlantRecord', plantSchema);

        // 3. INSERTION: Add 20 records
        console.log('--- 1. INSERTION ---');
        const insertedPlants = await Plant.insertMany([
            { name: 'Purple Coneflower', scientificName: 'Echinacea purpurea', sunlight: 'Full Sun', soil: 'Loam', heightInches: 36, bloomSeason: 'Summer' },
            { name: 'Butterfly Weed', scientificName: 'Asclepias tuberosa', sunlight: 'Full Sun', soil: 'Sand', heightInches: 24, bloomSeason: 'Summer' },
            { name: 'Wild Bergamot', scientificName: 'Monarda fistulosa', sunlight: 'Part Shade', soil: 'Clay', heightInches: 30, bloomSeason: 'Summer' },
            { name: 'Black-Eyed Susan', scientificName: 'Rudbeckia hirta', sunlight: 'Full Sun', soil: 'Loam', heightInches: 28, bloomSeason: 'Summer' },
            { name: 'Joe Pye Weed', scientificName: 'Eutrochium purpureum', sunlight: 'Full Sun', soil: 'Moist Loam', heightInches: 72, bloomSeason: 'Late Summer' },
            { name: 'New England Aster', scientificName: 'Symphyotrichum novae-angliae', sunlight: 'Full Sun', soil: 'Loam', heightInches: 48, bloomSeason: 'Fall' },
            { name: 'Cardinal Flower', scientificName: 'Lobelia cardinalis', sunlight: 'Part Shade', soil: 'Wet Soil', heightInches: 40, bloomSeason: 'Summer' },
            { name: 'Common Milkweed', scientificName: 'Asclepias syriaca', sunlight: 'Full Sun', soil: 'Dry', heightInches: 45, bloomSeason: 'Summer' },
            { name: 'Anise Hyssop', scientificName: 'Agastache foeniculum', sunlight: 'Full Sun', soil: 'Well-Drained', heightInches: 32, bloomSeason: 'Summer' },
            { name: 'Blue Flag Iris', scientificName: 'Iris versicolor', sunlight: 'Full Sun', soil: 'Wet', heightInches: 30, bloomSeason: 'Spring' },
            { name: 'Switchgrass', scientificName: 'Panicum virgatum', sunlight: 'Full Sun', soil: 'Adaptable', heightInches: 60, bloomSeason: 'Fall' },
            { name: 'Blazing Star', scientificName: 'Liatris spicata', sunlight: 'Full Sun', soil: 'Moist', heightInches: 36, bloomSeason: 'Summer' },
            { name: 'Foxglove Beardtongue', scientificName: 'Penstemon digitalis', sunlight: 'Full Sun', soil: 'Loam', heightInches: 35, bloomSeason: 'Spring' },
            { name: 'Turtlehead', scientificName: 'Chelone glabra', sunlight: 'Part Shade', soil: 'Wet', heightInches: 24, bloomSeason: 'Late Summer' },
            { name: 'Columbine', scientificName: 'Aquilegia canadensis', sunlight: 'Shade', soil: 'Rocky', heightInches: 18, bloomSeason: 'Spring' },
            { name: 'Goldenrod', scientificName: 'Solidago odora', sunlight: 'Full Sun', soil: 'Well-Drained', heightInches: 40, bloomSeason: 'Fall' },
            { name: 'Boneset', scientificName: 'Eupatorium perfoliatum', sunlight: 'Full Sun', soil: 'Wet', heightInches: 48, bloomSeason: 'Late Summer' },
            { name: 'Culver\'s Root', scientificName: 'Veronicastrum virginicum', sunlight: 'Full Sun', soil: 'Moist', heightInches: 60, bloomSeason: 'Summer' },
            { name: 'Great Blue Lobelia', scientificName: 'Lobelia siphilitica', sunlight: 'Part Shade', soil: 'Moist', heightInches: 36, bloomSeason: 'Late Summer' },
            { name: 'White Snakeroot', scientificName: 'Ageratina altissima', sunlight: 'Shade', soil: 'Rich', heightInches: 30, bloomSeason: 'Fall' }
        ]);
        console.log(`Successfully inserted ${insertedPlants.length} plant records.`);

        // 4. FIND: Retrieve all records
        console.log('\n--- 2. FIND (Retrieve All) ---');
        const allPlants = await Plant.find({});
        console.log(`Total records found in collection: ${allPlants.length}`);

        // 5. FILTERING: Query with specific criteria (Sunlight is Full Sun AND height > 40 inches)
        console.log('\n--- 3. FILTERING (Full Sun & Height > 40 inches) ---');
        const filteredPlants = await Plant.find({ sunlight: 'Full Sun', heightInches: { $gt: 40 } });
        filteredPlants.forEach(p => console.log(` - ${p.name} (${p.heightInches} inches)`));

        // 6. SORTING: Sort records by height in descending order
        console.log('\n--- 4. SORTING (Tallest to Shortest) ---');
        const sortedPlants = await Plant.find({}).sort({ heightInches: -1 }).limit(5);
        sortedPlants.forEach(p => console.log(` - ${p.name}: ${p.heightInches} inches`));

        // 7. UPDATE: Modify a record
        console.log('\n--- 5. UPDATE ---');
        const updatedPlant = await Plant.findOneAndUpdate(
            { name: 'Purple Coneflower' },
            { heightInches: 38, soil: 'Rich Loam' },
            { new: true }
        );
        console.log(`Updated Record: ${updatedPlant.name} is now ${updatedPlant.heightInches} inches tall.`);

        // 8. DELETE: Remove a record
        console.log('\n--- 6. DELETE ---');
        const deletedPlant = await Plant.findOneAndDelete({ name: 'Columbine' });
        console.log(`Deleted Record: ${deletedPlant.name}`);
        
        const finalCount = await Plant.countDocuments();
        console.log(`Final record count after deletion: ${finalCount}`);

    } catch (err) {
        console.error('Error during database operations:', err);
    } finally {
        await mongoose.connection.close();
        if (mongoServer) await mongoServer.stop();
        console.log('\nDatabase connection closed.');
    }
}

runPlantDatabase();