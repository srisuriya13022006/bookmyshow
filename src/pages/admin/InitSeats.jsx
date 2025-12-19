import { useState } from 'react';
import api from '../../api/api';

export default function InitSeats() {
  const [showId, setShowId] = useState('');
  const [totalSeats, setTotalSeats] = useState('');

  const initSeats = async () => {
    await api.post('/seats/init', {
      showId,
      totalSeats: Number(totalSeats)
    });

    alert('Seats initialized');
  };

  return (
    <div>
      <h3>Initialize Seats</h3>

      <input
        placeholder="Show ID"
        onChange={e => setShowId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Total Seats"
        onChange={e => setTotalSeats(e.target.value)}
      />

      <button onClick={initSeats}>Init Seats</button>
    </div>
  );
}
