// import { useState } from 'react';
// import api from '../api/api';

// export default function Login() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const submit = async () => {
//     if (isRegister) {
//       await api.post('/auth/register', {
//         name,
//         email,
//         password
//       });
//       alert('Registration successful. Please login.');
//       setIsRegister(false);
//       return;
//     }

//     const res = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('userId', res.data.userId);
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h2>{isRegister ? 'Sign Up' : 'Login'}</h2>

//       {isRegister && (
//         <input
//           placeholder="Name"
//           onChange={e => setName(e.target.value)}
//         />
//       )}

//       <input
//         placeholder="Email"
//         onChange={e => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={e => setPassword(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={submit}>
//         {isRegister ? 'Register' : 'Login'}
//       </button>

//       <p
//         style={{ cursor: 'pointer', color: 'blue' }}
//         onClick={() => setIsRegister(!isRegister)}
//       >
//         {isRegister
//           ? 'Already have an account? Login'
//           : 'New user? Sign up'}
//       </p>
//     </div>
//   );
// }
import { useState } from 'react';
import api from '../api/api';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      if (isRegister) {
        await api.post('/auth/register', { name, email, password });
        alert('Registration successful. Please login.');
        setIsRegister(false);
      } else {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a', // Deep Navy
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    },
    card: {
      backgroundColor: '#1e293b', // Slate 800
      padding: '40px',
      borderRadius: '28px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      border: '1px solid #334155',
      color: 'white',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      margin: '0 0 8px 0',
      color: 'white'
    },
    subtitle: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      margin: 0
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      marginBottom: '16px',
      borderRadius: '12px',
      border: '1px solid #334155',
      backgroundColor: '#0f172a',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: loading ? '#991b1b' : (isHovered ? '#ef4444' : '#dc2626'),
      color: 'white',
      fontWeight: '700',
      fontSize: '1rem',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px'
    },
    toggleContainer: {
      textAlign: 'center',
      marginTop: '25px',
      fontSize: '0.9rem',
      color: '#94a3b8'
    },
    link: {
      color: '#ef4444',
      fontWeight: '600',
      cursor: 'pointer',
      marginLeft: '5px',
      textDecoration: 'none'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{isRegister ? 'Join Us' : 'Welcome Back'}</h2>
          <p style={styles.subtitle}>
            {isRegister ? 'Create an account to start booking' : 'Log in to your movie portal'}
          </p>
        </div>

        <div>
          {isRegister && (
            <input
              style={styles.input}
              placeholder="Full Name"
              onChange={e => setName(e.target.value)}
            />
          )}

          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
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
            onMouseEnter={() => !loading && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </div>

        <div style={styles.toggleContainer}>
          {isRegister ? 'Already have an account?' : 'New to BookMyShow?'}
          <span 
            style={styles.link} 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Sign up now'}
          </span>
        </div>
      </div>
    </div>
  );
}