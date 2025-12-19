// export default function Header({ role }) {
//   const logout = () => {
//     if (role === 'admin') {
//       localStorage.removeItem('adminToken');
//     } else {
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//     }

//     window.location.reload();
//   };

//   return (
//     <div style={styles.header}>
//       <h3>🎬 BookMyShow</h3>

//       <button style={styles.logoutBtn} onClick={logout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// const styles = {
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px 20px',
//     borderBottom: '1px solid #ddd'
//   },
//   logoutBtn: {
//     padding: '6px 12px',
//     cursor: 'pointer'
//   }
// };
import { useState } from 'react';

export default function Header({ role }) {
  const [isHovered, setIsHovered] = useState(false);

  const logout = () => {
    if (role === 'admin') {
      localStorage.removeItem('adminToken');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
    window.location.reload();
  };

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 40px',
      height: '70px',
      backgroundColor: 'rgba(15, 23, 42, 0.9)', // Deep navy glass effect
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: '#ef4444', // Movie Red
      margin: 0,
      letterSpacing: '-0.5px',
      textTransform: 'uppercase',
    },
    roleBadge: {
      fontSize: '0.7rem',
      backgroundColor: role === 'admin' ? '#3b82f6' : '#10b981',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '12px',
      marginLeft: '10px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    logoutBtn: {
      padding: '8px 20px',
      cursor: 'pointer',
      backgroundColor: isHovered ? '#ef4444' : 'transparent',
      color: isHovered ? 'white' : '#94a3b8',
      border: isHovered ? '1px solid #ef4444' : '1px solid #334155',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      outline: 'none',
    }
  };

  return (
    <div style={styles.header}>
      <div style={styles.logoSection}>
        <h3 style={styles.logoText}>🎬 BookMyShow</h3>
        <span style={styles.roleBadge}>{role}</span>
      </div>

      <button 
        style={styles.logoutBtn} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}