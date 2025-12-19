// import { useEffect, useState } from 'react';
// import api from '../../api/api';

// export default function AddShow() {
//   const [movies, setMovies] = useState([]);
//   const [movieId, setMovieId] = useState('');
//   const [theater, setTheater] = useState('');
//   const [time, setTime] = useState('');
//   const [totalSeats, setTotalSeats] = useState('');

//   // 🔄 Fetch movies instantly
//   useEffect(() => {
   

//      api.get('/movies/all').then(res => setMovies(res.data));
//   }, []);

//   const addShow = async () => {
//     await api.post('/shows', {
//       movieId,
//       theater,
//       time,
//       totalSeats: Number(totalSeats)
//     });

//     alert('Show created and seats generated');
//   };

//   return (
//     <div>
//       <h3>Add Show</h3>

//       {/* Movie Dropdown */}
//       <select onChange={e => setMovieId(e.target.value)}>
//         <option value="">Select Movie</option>
//         {movies.map(movie => (
//           <option key={movie._id} value={movie._id}>
//             {movie.name}
//           </option>
//         ))}
//       </select>

//       <br /><br />

//       <input
//         placeholder="Theater Name"
//         onChange={e => setTheater(e.target.value)}
//       />

//       <input
//         placeholder="Show Time"
//         onChange={e => setTime(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Number of Seats"
//         onChange={e => setTotalSeats(e.target.value)}
//       />

//       <br /><br />

//       <button disabled={!movieId || !totalSeats} onClick={addShow}>
//         Add Show
//       </button>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function AddShow() {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [theater, setTheater] = useState('');
  const [time, setTime] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    api.get('/movies/all').then(res => setMovies(res.data));
  }, []);

  const addShow = async () => {
    try {
      await api.post('/shows', {
        movieId,
        theater,
        time,
        totalSeats: Number(totalSeats)
      });
      alert('✅ Show created and seats generated successfully!');
    } catch (err) {
      alert('❌ Error creating show');
    }
  };

  const isFormInvalid = !movieId || !theater || !time || !totalSeats;

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '35px',
      backgroundColor: '#1e293b',
      borderRadius: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      border: '1px solid #334155',
      fontFamily: 'system-ui, sans-serif',
      color: 'white'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '800',
      marginBottom: '25px',
      textAlign: 'center',
      color: '#f8fafc',
      letterSpacing: '-0.5px'
    },
    label: {
      display: 'block',
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#94a3b8',
      marginBottom: '8px',
      marginLeft: '4px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      marginBottom: '20px',
      borderRadius: '12px',
      border: '1px solid #334155',
      backgroundColor: '#0f172a',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
      appearance: 'none', // For select dropdown
      transition: 'all 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: isFormInvalid ? '#334155' : (isHovered ? '#2563eb' : '#3b82f6'),
      color: isFormInvalid ? '#64748b' : 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: isFormInvalid ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📅 Schedule New Show</h3>

      <div>
        <label style={styles.label}>Select Movie</label>
        <select 
          style={styles.input} 
          onChange={e => setMovieId(e.target.value)}
          value={movieId}
        >
          <option value="">Choose a movie...</option>
          {movies.map(movie => (
            <option key={movie._id} value={movie._id} style={{backgroundColor: '#1e293b'}}>
              {movie.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={styles.label}>Theater Name</label>
        <input
          style={styles.input}
          placeholder="e.g. PVR Cinemas"
          onChange={e => setTheater(e.target.value)}
        />
      </div>

      <div style={styles.grid}>
        <div>
          <label style={styles.label}>Show Time</label>
          <input
            style={styles.input}
            placeholder="e.g. 09:00 PM"
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <div>
          <label style={styles.label}>Total Seats</label>
          <input
            style={styles.input}
            type="number"
            placeholder="e.g. 100"
            onChange={e => setTotalSeats(e.target.value)}
          />
        </div>
      </div>

      <button 
        disabled={isFormInvalid} 
        style={styles.button}
        onMouseEnter={() => !isFormInvalid && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={addShow}
      >
        {isFormInvalid ? 'Complete Form to Proceed' : '🚀 Create Show Listing'}
      </button>
    </div>
  );
}