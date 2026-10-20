import React, { useState, useEffect } from 'react';

export default function PlantApiData() {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch external plant data from the API.');
                }
                return response.json();
            })
            .then(data => {
                setApiData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '1.5rem', color: '#2d5a27' }}>Loading external botanical data...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '1.5rem', color: '#d9534f' }}>Error: {error}</div>;
    }

    return (
        <div style={{ backgroundColor: '#f9fbf8', border: '1px solid #d4e2d4', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem auto', maxWidth: '800px' }}>
            <h3 style={{ color: '#2d5a27', marginBottom: '0.5rem', marginTop: 0 }}>Live External Garden Notice (API Connected)</h3>
            <p style={{ color: '#444', margin: '0.5rem 0' }}><strong>Fetched Update:</strong> {apiData.title}</p>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Status: Successfully synchronized with public server via GET request.</p>
        </div>
    );
}