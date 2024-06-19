import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8000/movie/list/');
      setData(response.data.movies); // Assuming movies are under "movies" key
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <ul>
          {data.map((movie) => (
            <li key={movie.id}><h2>{movie.name}</h2><p>{movie.description}</p> </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;