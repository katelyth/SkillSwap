// Requests.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [requestInput, setRequestInput] = useState('');

  useEffect(() => {
    // Fetch existing requests from the backend
    axios.get('/api/requests')
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  const handleAddRequest = () => {
    if (!requestInput) return;
    axios.post('/api/requests', { description: requestInput })
      .then(response => {
        setRequests([...requests, response.data]);
        setRequestInput('');
      })
      .catch(error => console.error('Error adding request:', error));
  };

  return (
    <div>
      <h2>Requests</h2>
      <input
        type="text"
        value={requestInput}
        onChange={e => setRequestInput(e.target.value)}
        placeholder="Enter a new request"
      />
      <button onClick={handleAddRequest}>Add Request</button>
      <ul>
        {requests.map(request => (
          <li key={request.id}>{request.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
