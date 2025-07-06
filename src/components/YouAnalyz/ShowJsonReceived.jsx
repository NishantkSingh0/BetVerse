import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ShowJsonReceived = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');

    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('video_update', (newData) => {
      setData(newData);  // Replace previous data with latest one
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Live JSON Data</h2>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
        {data ? JSON.stringify(data, null, 2) : 'Waiting for data...'}
      </pre>
    </div>
  );
};

export default ShowJsonReceived;