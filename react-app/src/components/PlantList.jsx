import React, { useState } from 'react';
import PlantCard from './PlantCard';

export default function PlantList({ plants }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSunlight, setSelectedSunlight] = useState('All');
    const [selectedSoil, setSelectedSoil] = useState('All');
    const [selectedSeason, setSelectedSeason] = useState('All');

    // Reset all filters function
    const handleReset = () => {
        setSearchTerm('');
        setSelectedSunlight('All');
        setSelectedSoil('All');
        setSelectedSeason('All');
    };

    // Filter plants based on search and all dropdown criteria
    const filteredPlants = plants.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSunlight = selectedSunlight === 'All' || plant.sunlight.includes(selectedSunlight);
        const matchesSoil = selectedSoil === 'All' || plant.soilType.toLowerCase().includes(selectedSoil.toLowerCase());
        const matchesSeason = selectedSeason === 'All' || plant.bloomSeason === selectedSeason;

        return matchesSearch && matchesSunlight && matchesSoil && matchesSeason;
    });

    return (
        <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#2d5a27', textAlign: 'center', marginBottom: '1.5rem' }}>Enhanced Native Plant Directory</h2>
            
            {/* Search and Filters Panel */}
            <div style={{ backgroundColor: '#f0f5ed', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Search Bar */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <input 
                        type="text" 
                        placeholder="Search by common or scientific name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '0.7rem 1rem', width: '100%', maxWidth: '500px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
                    />
                </div>

                {/* Dropdown Filters & Reset */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                    
                    {/* Sunlight Filter */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#2d5a27', marginBottom: '0.3rem' }}>Sunlight:</label>
                        <select 
                            value={selectedSunlight} 
                            onChange={(e) => setSelectedSunlight(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="All">All Sunlight</option>
                            <option value="Full Sun">Full Sun</option>
                            <option value="Part Shade">Part Shade</option>
                            <option value="Shade">Shade</option>
                        </select>
                    </div>

                    {/* Soil Type Filter */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#2d5a27', marginBottom: '0.3rem' }}>Soil Type:</label>
                        <select 
                            value={selectedSoil} 
                            onChange={(e) => setSelectedSoil(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="All">All Soil Types</option>
                            <option value="Well-drained">Well-drained</option>
                            <option value="Moist">Moist</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Clay">Clay</option>
                        </select>
                    </div>

                    {/* Bloom Season Filter */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#2d5a27', marginBottom: '0.3rem' }}>Bloom Season:</label>
                        <select 
                            value={selectedSeason} 
                            onChange={(e) => setSelectedSeason(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="All">All Seasons</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Late Summer">Late Summer</option>
                            <option value="Fall">Fall</option>
                        </select>
                    </div>

                    {/* Reset Button */}
                    <div style={{ alignSelf: 'flex-end' }}>
                        <button 
                            onClick={handleReset}
                            style={{ padding: '0.55rem 1rem', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Conditional Rendering for Empty States */}
            {filteredPlants.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', padding: '3rem' }}>No plants found matching your criteria.</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '1.5rem' 
                }}>
                    {filteredPlants.map(plant => (
                        <PlantCard key={plant.id} plant={plant} />
                    ))}
                </div>
            )}
        </section>
    );
}
