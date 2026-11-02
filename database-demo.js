const mongoose = require('mongoose');

// 1. Connect to MongoDB (Local or Atlas URI)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/native-plant-app';

async function runDatabaseOperations() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB database successfully!');

        // 2. Create Schema & Collection Model matching required fields
        const plantSchema = new mongoose.Schema({
            name: { type: String, required: true },
            scientificName: { type: String, required: true },
            description: String,
            sunlight: String,
            soil: String,
            water: String,
            height: String,
            bloomSeason: String,
            nativeRange: String,
            wildlifeBenefits: String,
            image: String
        });

        // This creates the 'plants' collection automatically
        const Plant = mongoose.model('Plant', plantSchema);

        // Clear existing data for demonstration clarity
        await Plant.deleteMany({});

        // 3. Insert Documents
        console.log('\n--- Inserting Plant Documents ---');
        const insertedPlants = await Plant.insertMany([
            {
                name: 'Purple Coneflower',
                scientificName: 'Echinacea purpurea',
                description: 'A hardy perennial with bright purple petals and prominent seed cones.',
                sunlight: 'Full Sun',
                soil: 'Well-drained loam or clay',
                water: 'Low to Medium',
                height: '2-4 feet',
                bloomSeason: 'Summer',
                nativeRange: 'Eastern North America',
                wildlifeBenefits: 'Attracts butterflies and bees; seeds feed goldfinches.',
                image: 'purple-coneflower.jpg'
            },
            {
                name: 'Butterfly Weed',
                scientificName: 'Asclepias tuberosa',
                description: 'Striking bright orange clusters of flowers that thrive in dry soils.',
                sunlight: 'Full Sun',
                soil: 'Dry, sandy, well-drained',
                water: 'Low',
                height: '1-2.5 feet',
                bloomSeason: 'Summer',
                nativeRange: 'North America',
                wildlifeBenefits: 'Crucial host plant for Monarch butterfly larvae.',
                image: 'butterfly-weed.jpg'
            },
            {
                name: 'Wild Bergamot',
                scientificName: 'Monarda fistulosa',
                description: 'Lavender pom-pom flowers with aromatic foliage.',
                sunlight: 'Full Sun to Part Shade',
                soil: 'Loam, clay, or sand',
                water: 'Medium',
                height: '2-3 feet',
                bloomSeason: 'Summer',
                nativeRange: 'North America',
                wildlifeBenefits: 'Favored by bumblebees, hummingbirds, and sphinx moths.',
                image: 'wild-bergamot.jpg'
            }
        ]);
        console.log(`Successfully inserted ${insertedPlants.length} documents.`);

        // 4. Query Documents
        console.log('\n--- Querying Documents ---');
        const allPlants = await Plant.find({});
        console.log(`Total plants in database: ${allPlants.length}`);
        
        const singlePlant = await Plant.findOne({ name: 'Purple Coneflower' });
        console.log(`Queried Plant: ${singlePlant.name} (${singlePlant.scientificName}) - Sunlight: ${singlePlant.sunlight}`);

        // 5. Update Documents
        console.log('\n--- Updating Documents ---');
        const updatedPlant = await Plant.findOneAndUpdate(
            { name: 'Purple Coneflower' },
            { sunlight: 'Full Sun / Partial Shade', height: '2-5 feet' },
            { new: true }
        );
        console.log(`Updated Plant Sunlight: ${updatedPlant.name} is now rated for "${updatedPlant.sunlight}".`);

        // 6. Delete Documents
        console.log('\n--- Deleting Documents ---');
        const deletedPlant = await Plant.findOneAndDelete({ name: 'Butterfly Weed' });
        console.log(`Deleted plant: ${deletedPlant.name}`);

        const remainingPlants = await Plant.find({});
        console.log(`Remaining plants count in collection: ${remainingPlants.length}`);

    } catch (err) {
        console.error('Database operation error:', err);
    } finally {
        await mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

runDatabaseOperations();
