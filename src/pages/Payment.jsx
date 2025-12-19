// import api from '../api/api';

// export default function Payment({ bookingId }) {
//   const pay = async (status) => {
//     await api.post('/payments', {
//       bookingId,
//       amount: 500,
//       status
//     });

//     alert(
//       status === 'SUCCESS'
//         ? '🎉 Booking Confirmed!'
//         : '❌ Payment Failed, Seats Released'
//     );
//   };

//   return (
//     <div>
//       <h2>Payment</h2>

//       <button onClick={() => pay('SUCCESS')}>
//         Pay ₹500 (Success)
//       </button>

//       <br /><br />

//       <button onClick={() => pay('FAILED')}>
//         Simulate Failure
//       </button>
//     </div>
//   );
// }
import { useState } from 'react';
import api from '../api/api';

export default function Payment({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(null);

  const pay = async (status) => {
    setLoading(true);
    try {
      await api.post('/payments', {
        bookingId,
        amount: 500,
        status
      });

      if (status === 'SUCCESS') {
        alert('🎉 Booking Confirmed! Enjoy your movie.');
      } else {
        alert('❌ Payment Failed. The seats have been released.');
      }
      // Usually, you would redirect the user here
      window.location.href = '/'; 
    } catch (err) {
      alert('Error processing payment.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrapper: {
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white',
    },
    card: {
      backgroundColor: '#1e293b',
      padding: '40px',
      borderRadius: '24px',
      width: '100%',
      maxWidth: '450px',
      textAlign: 'center',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
      border: '1px solid #334155',
    },
    iconArea: {
      fontSize: '3.5rem',
      marginBottom: '20px',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '800',
      marginBottom: '10px',
      margin: 0,
    },
    priceTag: {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: '#10b981', // Emerald Green
      margin: '20px 0',
    },
    details: {
      backgroundColor: '#0f172a',
      padding: '15px',
      borderRadius: '12px',
      marginBottom: '30px',
      fontSize: '0.9rem',
      color: '#94a3b8',
      textAlign: 'left',
    },
    successBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: loading ? '#065f46' : (hovered === 'pay' ? '#10b981' : '#059669'),
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '15px',
    },
    failBtn: {
      width: '100%',
      padding: '12px',
      borderRadius: '12px',
      border: '1px solid #ef4444',
      backgroundColor: 'transparent',
      color: '#ef4444',
      fontWeight: '600',
      fontSize: '0.9rem',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      opacity: hovered === 'fail' ? 1 : 0.7,
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconArea}>💳</div>
        <h2 style={styles.title}>Secure Checkout</h2>
        
        <div style={styles.priceTag}>₹500.00</div>

        <div style={styles.details}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>Booking ID:</span>
            <span style={{ color: 'white' }}>#{bookingId?.slice(-6).toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Platform Fee:</span>
            <span style={{ color: 'white' }}>Included</span>
          </div>
        </div>

        <button 
          style={styles.successBtn}
          onMouseEnter={() => setHovered('pay')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => pay('SUCCESS')}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </button>

        <button 
          style={styles.failBtn}
          onMouseEnter={() => setHovered('fail')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => pay('FAILED')}
          disabled={loading}
        >
          Simulate Payment Failure
        </button>

        <p style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748b' }}>
          🔒 Your payment information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}