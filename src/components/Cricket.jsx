import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/matches`;  // Backend URL from .env

      try {
        const response = await axios.get(url);
        setMatches(response.data.matches || []);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Live Cricket Matches</h1>
      {matches.length === 0 ? (
        <p>No matches available.</p>
      ) : (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              <strong>{match['team-1']}</strong> vs <strong>{match['team-2']}</strong> | Match Started: {match.matchStarted ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
