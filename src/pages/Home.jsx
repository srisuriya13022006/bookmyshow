// import React from 'react';

// export default function Home({ onSelect }) {
//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white font-sans">
//       {/* Header Section */}
//       <header className="mb-12 text-center">
//         <h1 className="text-5xl font-extrabold tracking-tight text-red-600 mb-2">
//           🎬 BookMyShow
//         </h1>
//         <p className="text-gray-400 text-lg">Select your portal to continue</p>
//       </header>

//       {/* Card Container */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-6">
        
//         {/* User Card */}
//         <div 
//           onClick={() => onSelect('user')}
//           className="group cursor-pointer bg-gray-800 border-2 border-transparent hover:border-red-500 p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
//         >
//           <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🍿</div>
//           <h2 className="text-2xl font-bold mb-2">User Portal</h2>
//           <p className="text-gray-400 text-sm mb-6">Book tickets, explore movies, and check showtimes.</p>
//           <button className="w-full bg-red-600 group-hover:bg-red-500 py-3 rounded-lg font-semibold transition-colors">
//             Login as User
//           </button>
//         </div>

//         {/* Admin Card */}
//         <div 
//           onClick={() => onSelect('admin')}
//           className="group cursor-pointer bg-gray-800 border-2 border-transparent hover:border-blue-500 p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
//         >
//           <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛠️</div>
//           <h2 className="text-2xl font-bold mb-2">Admin Portal</h2>
//           <p className="text-gray-400 text-sm mb-6">Manage movies, theater schedules, and user bookings.</p>
//           <button className="w-full bg-blue-600 group-hover:bg-blue-500 py-3 rounded-lg font-semibold transition-colors">
//             Login as Admin
//           </button>
//         </div>

//       </div>

//       <footer className="mt-16 text-gray-500 text-sm">
//         © 2024 BookMyShow Clone • Built with React
//       </footer>
//     </div>
//   );
// }

import React, { useState } from 'react';

export default function Home({ onSelect }) {
  // State to track which card is being hovered for the interactive effect
  const [hovered, setHovered] = useState(null);

  const styles = {
    // Inside Home.jsx styles object
wrapper: {
  minHeight: '100vh',
  width: '100vw', // Ensure it spans the full viewport width
  backgroundColor: '#0f172a',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Centers cards horizontally
  justifyContent: 'center', // Centers cards vertically
  color: 'white',
  fontFamily: 'Inter, system-ui, sans-serif',
  margin: 0,
  padding: '20px',
  boxSizing: 'border-box' // Prevents padding from adding to the width
},
    header: {
      marginBottom: '48px',
      textAlign: 'center',
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      letterSpacing: '-0.025em',
      color: '#dc2626', // Red-600
      marginBottom: '8px',
      margin: 0,
    },
    subtitle: {
      color: '#9ca3af', // Gray-400
      fontSize: '1.125rem',
      margin: 0,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px',
      width: '100%',
      maxWidth: '800px',
    },
    card: (type) => ({
      cursor: 'pointer',
      backgroundColor: '#1f2937', // Gray-800
      border: `2px solid ${
        hovered === type 
          ? (type === 'user' ? '#ef4444' : '#3b82f6') 
          : 'transparent'
      }`,
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: hovered === type ? 'translateY(-8px)' : 'translateY(0)',
      textAlign: 'center',
    }),
    emoji: (type) => ({
      fontSize: '2.5rem',
      marginBottom: '16px',
      transition: 'transform 0.3s ease',
      transform: hovered === type ? 'scale(1.1)' : 'scale(1)',
    }),
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '8px',
      margin: 0,
    },
    cardDescription: {
      color: '#9ca3af',
      fontSize: '0.875rem',
      marginBottom: '24px',
      lineHeight: '1.5',
    },
    button: (type) => ({
      width: '100%',
      backgroundColor: type === 'user' 
        ? (hovered === 'user' ? '#ef4444' : '#dc2626') 
        : (hovered === 'admin' ? '#3b82f6' : '#2563eb'),
      color: 'white',
      padding: '12px 0',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }),
    footer: {
      marginTop: '64px',
      color: '#6b7280', // Gray-500
      fontSize: '0.875rem',
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎬 BookMyShow</h1>
        <p style={styles.subtitle}>Select your portal to continue</p>
      </header>

      <div style={styles.grid}>
        {/* User Card */}
        <div 
          onMouseEnter={() => setHovered('user')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('user')}
          style={styles.card('user')}
        >
          <div style={styles.emoji('user')}>🍿</div>
          <h2 style={styles.cardTitle}>User Portal</h2>
          <p style={styles.cardDescription}>
            Book tickets, explore movies, and check showtimes.
          </p>
          <button style={styles.button('user')}>
            Login as User
          </button>
        </div>

        {/* Admin Card */}
        <div 
          onMouseEnter={() => setHovered('admin')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('admin')}
          style={styles.card('admin')}
        >
          <div style={styles.emoji('admin')}>🛠️</div>
          <h2 style={styles.cardTitle}>Admin Portal</h2>
          <p style={styles.cardDescription}>
            Manage movies, theater schedules, and user bookings.
          </p>
          <button style={styles.button('admin')}>
            Login as Admin
          </button>
        </div>
      </div>

      <footer style={styles.footer}>
        © 2024 BookMyShow Clone • Built with React
      </footer>
    </div>
  );
}