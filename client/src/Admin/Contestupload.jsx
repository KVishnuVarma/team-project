import React, { useState } from 'react';
import './Contestupload.css'

const ContestUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/contests/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, startTime })
            });

            if (response.ok) {
                setSuccessMessage('Contest added successfully!');
                setTitle('');
                setDescription('');
                setStartTime('');
                
                setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            } else {
                alert('Failed to add contest.');
            }
        } catch (error) {
            console.error('Error adding contest:', error);
            alert('An error occurred while adding the contest.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h3>Upload New Contest</h3>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                
                <div>
                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Add Contest</button>
            </form>
        </div>
    );
};

export default ContestUpload;
