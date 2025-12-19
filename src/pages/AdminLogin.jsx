// import { useState } from 'react';
// import api from '../api/api';

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const login = async () => {
//     const res = await api.post('/admin/login', { email, password });
//     localStorage.setItem('adminToken', res.data.token);
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>

//       <input placeholder="Admin Email" onChange={e => setEmail(e.target.value)} />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={e => setPassword(e.target.value)}
//       />

//       <br /><br />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }
import { useState } from 'react';
import api from '../api/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const login = async () => {
    try {
      const res = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      window.location.reload();
    } catch (err) {
      alert("Invalid Admin Credentials");
    }
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a', // Dark Navy
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    card: {
      backgroundColor: '#1e293b', // Slate 800
      padding: '40px',
      borderRadius: '24px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid #334155',
      textAlign: 'center',
    },
    iconCircle: {
      width: '60px',
      height: '60px',
      backgroundColor: '#3b82f6', // Admin Blue
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px auto',
      fontSize: '1.5rem',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
    },
    title: {
      color: 'white',
      fontSize: '1.75rem',
      fontWeight: '800',
      marginBottom: '10px',
      margin: 0,
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '0.9rem',
      marginBottom: '30px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      marginBottom: '15px',
      borderRadius: '12px',
      border: '1px solid #334155',
      backgroundColor: '#0f172a',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease',
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: isHovered ? '#2563eb' : '#3b82f6',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
    },
    footerLink: {
      marginTop: '25px',
      color: '#64748b',
      fontSize: '0.85rem',
      textDecoration: 'none',
      display: 'block',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconCircle}>🛡️</div>
        
        <h2 style={styles.title}>Admin Access</h2>
        <p style={styles.subtitle}>Enter your credentials to manage the portal</p>

        <div onKeyDown={(e) => e.key === 'Enter' && login()}>
          <input 
            style={styles.input}
            type="email"
            placeholder="Admin Email" 
            onChange={e => setEmail(e.target.value)} 
          />
          
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />

          <button 
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={login}
          >
            Authorize & Login
          </button>
        </div>

        <span style={styles.footerLink} onClick={() => window.location.href = '/'}>
          ← Back to Main Website
        </span>
      </div>
    </div>
  );
}