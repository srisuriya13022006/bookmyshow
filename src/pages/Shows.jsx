// import { useState, useEffect } from 'react'; // <--- Add this line
// import api from '../api/api'; 
// export default function Shows({ movieId, onSelectShow }) {
//   const [shows, setShows] = useState([]);

//   useEffect(() => {
//     // Note: Ensure 'api' is also imported if it's a custom axios instance
//     api.get(`/shows/${movieId}`)
//       .then(res => setShows(res.data));
//   }, [movieId]);

//   return (
//     <div>
//       <h2>Shows</h2>
//       {shows.map(show => (
//         <button key={show._id} onClick={() => onSelectShow(show._id)}>
//           🎭 {show.theater} | ⏰ {show.time}
//         </button>
//       ))}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import api from '../api/api';

export default function Shows({ movieId, onSelectShow }) {
  const [shows, setShows] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    api.get(`/shows/${movieId}`).then(res => setShows(res.data));
  }, [movieId]);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white',
    },
    wrapper: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '30px',
      borderBottom: '1px solid #334155',
      paddingBottom: '20px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      margin: 0,
    },
    theaterCard: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '20px',
      border: '1px solid #334155',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    theaterHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    theaterName: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#f8fafc',
    },
    timeGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
    },
    timePill: (id) => ({
      padding: '10px 20px',
      backgroundColor: hoveredId === id ? '#ef4444' : 'transparent',
      border: `1px solid ${hoveredId === id ? '#ef4444' : '#475569'}`,
      color: hoveredId === id ? 'white' : '#94a3b8',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      outline: 'none',
    }),
    infoTag: {
      fontSize: '0.75rem',
      color: '#10b981', // Green for "Available"
      marginTop: '8px',
      display: 'block',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h2 style={styles.title}>Available Shows</h2>
          <p style={{ color: '#94a3b8', marginTop: '5px' }}>Pick a time and theater that suits you</p>
        </div>

        {shows.length > 0 ? (
          shows.map(show => (
            <div key={show._id} style={styles.theaterCard}>
              <div style={styles.theaterHeader}>
                <span style={{ fontSize: '1.5rem' }}>🎭</span>
                <span style={styles.theaterName}>{show.theater}</span>
              </div>
              
              <div style={styles.timeGrid}>
                <div style={{ position: 'relative' }}>
                  <button 
                    style={styles.timePill(show._id)}
                    onMouseEnter={() => setHoveredId(show._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelectShow(show._id)}
                  >
                    {show.time}
                  </button>
                  <span style={styles.infoTag}>● Fast Filling</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#64748b' }}>
            <p>No shows scheduled for this movie yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}