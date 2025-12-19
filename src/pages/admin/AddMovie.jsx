// import { useState } from 'react';
// import api from '../../api/api';

// export default function AddMovie() {
//   const [name, setName] = useState('');
//   const [city, setCity] = useState('');

//   const addMovie = async () => {
//     await api.post('/movies', { name, city });
//     alert('Movie added');
//   };

//   return (
//     <div>
//       <h3>Add Movie</h3>
//       <input placeholder="Movie Name" onChange={e => setName(e.target.value)} />
//       <input placeholder="City" onChange={e => setCity(e.target.value)} />
//       <button onClick={addMovie}>Add</button>
//     </div>
//   );
// }
import { useState } from 'react';
import api from '../../api/api';

export default function AddMovie() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const addMovie = async () => {
    if (!name || !city) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await api.post('/movies', { name, city });
      alert('Movie added successfully!');
      setName('');
      setCity('');
    } catch (err) {
      alert("Failed to add movie");
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#1e293b', // Slate 800
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      border: '1px solid #334155',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      fontSize: '0.85rem',
      color: '#94a3b8',
      marginBottom: '5px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '1px solid #334155',
      backgroundColor: '#0f172a', // Deep Navy
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '14px',
      marginTop: '10px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: isHovered ? '#2563eb' : '#3b82f6', // Blue shade
      color: 'white',
      fontWeight: '700',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <span>🎬</span> Add New Movie
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Movie Title</label>
        <input 
          style={styles.input}
          value={name}
          placeholder="e.g. Inception" 
          onChange={e => setName(e.target.value)} 
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Location / City</label>
        <input 
          style={styles.input}
          value={city}
          placeholder="e.g. Mumbai" 
          onChange={e => setCity(e.target.value)} 
        />
      </div>

      <button 
        style={styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={addMovie}
      >
        ➕ Add Movie to Database
      </button>
    </div>
  );
}