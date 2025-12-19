// import Header from '../components/Header';
// import { useEffect, useState } from 'react';
// import api from '../api/api';

// export default function Movies({ onSelectMovie }) {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//      api.get('/movies/all')
//       .then(res => setMovies(res.data));
//   }, []);

//   return (
//     <>
//       <Header role="user" />

//       <div>
//         <h2>Movies</h2>
//         {movies.map(movie => (
//           <button key={movie._id} onClick={() => onSelectMovie(movie._id)}>
//             {movie.name}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// }
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Movies({ onSelectMovie }) {
  const [movies, setMovies] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    api.get('/movies/all').then(res => setMovies(res.data));
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    headingSection: {
      marginBottom: '40px',
      borderLeft: '5px solid #ef4444',
      paddingLeft: '20px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: 'white',
      margin: 0,
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '1.1rem',
      marginTop: '5px',
    },
    movieGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '30px',
    },
    movieCard: (id) => ({
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: hoveredId === id ? 'scale(1.05)' : 'scale(1)',
      boxShadow: hoveredId === id 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' 
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: hoveredId === id ? '1px solid #ef4444' : '1px solid #334155',
    }),
    posterPlaceholder: {
      height: '320px',
      backgroundColor: '#334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      backgroundImage: 'linear-gradient(to bottom, #334155, #1e293b)',
    },
    movieInfo: {
      padding: '20px',
      textAlign: 'center',
    },
    movieName: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '8px',
      display: 'block',
    },
    locationTag: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      backgroundColor: '#0f172a',
      padding: '4px 12px',
      borderRadius: '20px',
      display: 'inline-block',
    },
    bookBtn: (id) => ({
      marginTop: '15px',
      width: '100%',
      padding: '10px',
      backgroundColor: hoveredId === id ? '#ef4444' : 'transparent',
      border: `1px solid ${hoveredId === id ? '#ef4444' : '#ef4444'}`,
      color: hoveredId === id ? 'white' : '#ef4444',
      borderRadius: '8px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    })
  };

  return (
    <>
      <Header role="user" />
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          
          <div style={styles.headingSection}>
            <h2 style={styles.title}>Now Showing</h2>
            <p style={styles.subtitle}>Explore the latest blockbusters near you</p>
          </div>

          <div style={styles.movieGrid}>
            {movies.map(movie => (
              <div 
                key={movie._id} 
                style={styles.movieCard(movie._id)}
                onMouseEnter={() => setHoveredId(movie._id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectMovie(movie._id)}
              >
                {/* Poster Image Area */}
                <div style={styles.posterPlaceholder}>
                  🎬
                </div>

                <div style={styles.movieInfo}>
                  <span style={styles.movieName}>{movie.name}</span>
                  <span style={styles.locationTag}>📍 {movie.city || 'Multiplex'}</span>
                  
                  <button style={styles.bookBtn(movie._id)}>
                    Book Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>

          {movies.length === 0 && (
            <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '100px' }}>
              <h3>No movies found in your area.</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}