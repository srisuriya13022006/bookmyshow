import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies?city=Chennai')
      .then(res => setMovies(res.data));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      {movies.map(m => (
        <div key={m._id}>
          <p>{m.name}</p>
        </div>
      ))}
    </div>
  );
}
