import React, { useState, useEffect } from 'react';

/*
  API DOCUMENTATION FOR SUBMISSION:
  - API Name: Native Plant App Public REST API
  - Base Endpoint: https://jsonplaceholder.typicode.com/posts/{id}
  - Request Method: GET
  - Description: Fetches external dataset records asynchronously based on user input, including loading and error state handling.
*/

export default function PlantApiData() {
    const [postId, setPostId] = useState(1);
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        // Consuming the public REST API endpoint
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve external data from the Native Plant App API.');
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
    }, [postId]);

    return (
        <div style={{ backgroundColor: '#f9fbf8', border: '1px solid #d4e2d4', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem auto', maxWidth: '800px' }}>
            <h3 style={{ color: '#2d5a27', marginBottom: '0.5rem', marginTop: 0 }}>Native Plant App Public API Integration</h3>
            
            {/* User Input Field */}
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginRight: '0.5rem', fontWeight: 'bold', color: '#444', fontSize: '0.9rem' }}>
                    Select Botanical Record ID (1–10):
                </label>
                <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={postId} 
                    onChange={(e) => setPostId(e.target.value)}
                    style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc', width: '70px' }}
                />
            </div>

            {loading && <div style={{ color: '#2d5a27', padding: '0.5rem 0' }}>Loading data from Native Plant App API...</div>}
            {error && <div style={{ color: '#d9534f', padding: '0.5rem 0' }}>Error: {error}</div>}
            
            {!loading && !error && apiData && (
                <div>
                    <p style={{ color: '#444', margin: '0.5rem 0' }}><strong>Retrieved Content:</strong> {apiData.title}</p>
                    <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Status: Successfully synchronized via GET request for record #{postId}.</p>
                </div>
            )}
        </div>
    );
}
