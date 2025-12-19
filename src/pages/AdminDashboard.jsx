// import Header from '../components/Header';
// import { useState } from 'react';
// import AddMovie from './admin/AddMovie';
// import AddShow from './admin/AddShow';
// import InitSeats from './admin/InitSeats';

// export default function AdminDashboard() {
//   const [page, setPage] = useState('movie');

//   return (
//     <>
//       <Header role="admin" />

//       <div>
//         <h2>Admin Dashboard</h2>

//         <button onClick={() => setPage('movie')}>Add Movie</button>
// <button onClick={() => setPage('show')}>Add Show</button>


//         <br /><br />

//         {page === 'movie' && <AddMovie />}
//         {page === 'show' && <AddShow />}
//         {page === 'seat' && <InitSeats />}
//       </div>
//     </>
//   );
// }
import Header from '../components/Header';
import { useState } from 'react';
import AddMovie from './admin/AddMovie';
import AddShow from './admin/AddShow';

export default function AdminDashboard() {
  const [page, setPage] = useState('movie');
  const [hoveredTab, setHoveredTab] = useState(null);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0f172a', // Deep Navy background
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#f8fafc',
      padding: '20px'
    },
    mainContent: {
      maxWidth: '1000px',
      margin: '0 auto',
      marginTop: '30px'
    },
    titleSection: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      color: 'white',
      margin: '0 0 10px 0'
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '1rem'
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '40px',
      backgroundColor: '#1e293b',
      padding: '8px',
      borderRadius: '16px',
      width: 'fit-content',
      margin: '0 auto 40px auto',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    tab: (isActive, isHovered) => ({
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backgroundColor: isActive ? '#3b82f6' : (isHovered ? '#334155' : 'transparent'),
      color: isActive ? 'white' : (isHovered ? '#f8fafc' : '#94a3b8'),
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }),
    contentArea: {
      animation: 'fadeIn 0.4s ease-out'
    }
  };

  return (
    <>
      <Header role="admin" />
      
      <div style={styles.container}>
        <div style={styles.mainContent}>
          
          <div style={styles.titleSection}>
            <h2 style={styles.title}>Admin Control Center</h2>
            <p style={styles.subtitle}>Manage your movies, shows, and seating arrangements</p>
          </div>

          {/* Navigation Tabs */}
          <div style={styles.navContainer}>
            <button 
              style={styles.tab(page === 'movie', hoveredTab === 'movie')} 
              onMouseEnter={() => setHoveredTab('movie')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setPage('movie')}
            >
              🎬 Add Movie
            </button>
            
            <button 
              style={styles.tab(page === 'show', hoveredTab === 'show')}
              onMouseEnter={() => setHoveredTab('show')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setPage('show')}
            >
              📅 Add Show
            </button>

           
          </div>

          {/* Dynamic Content Area */}
          <div style={styles.contentArea}>
            {page === 'movie' && <AddMovie />}
            {page === 'show' && <AddShow />}
            {page === 'seat' && (
              <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '50px' }}>
                {/* InitSeats logic would render here */}
                <h3>Seating Initialization Module</h3>
                <p>Configure and reset theater layouts.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Basic Fade-in Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}