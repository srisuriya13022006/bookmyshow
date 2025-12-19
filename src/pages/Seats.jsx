// import { useState, useEffect } from 'react'; // <--- Add this line
// import api from '../api/api';
// export default function Seats({ showId, onBookingCreated }) {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     api.get(`/seats/${showId}`).then(res => setSeats(res.data));
//   }, [showId]);

//   const toggleSeat = (seat) => {
//     if (seat.status !== 'AVAILABLE') return;

//     setSelectedSeats(prev =>
//       prev.includes(seat.seatNumber)
//         ? prev.filter(s => s !== seat.seatNumber)
//         : [...prev, seat.seatNumber]
//     );
//   };

//  const bookSeats = async () => {
//   if (selectedSeats.length === 0) {
//     alert('Please select at least one seat');
//     return;
//   }

//   const res = await api.post('/bookings', {
//     userId,
//     showId,
//     seats: selectedSeats
//   });

//   onBookingCreated(res.data._id);
// };


//   return (
//     <div>
//       <h2>Select Seats</h2>

//       {seats.map(seat => (
//         <button
//           key={seat._id}
//           onClick={() => toggleSeat(seat)}
//           style={{
//             margin: 5,
//             backgroundColor:
//               seat.status === 'BOOKED'
//                 ? 'red'
//                 : selectedSeats.includes(seat.seatNumber)
//                 ? 'green'
//                 : 'lightgray'
//           }}
//         >
//           {seat.seatNumber}
//         </button>
//       ))}

//       <br /><br />
//       <button onClick={bookSeats} disabled={selectedSeats.length === 0}>
//   Proceed to Payment
// </button>

//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import api from '../api/api';

export default function Seats({ showId, onBookingCreated }) {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    api.get(`/seats/${showId}`).then(res => setSeats(res.data));
  }, [showId]);

  const toggleSeat = (seat) => {
    if (seat.status !== 'AVAILABLE') return;

    setSelectedSeats(prev =>
      prev.includes(seat.seatNumber)
        ? prev.filter(s => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  const bookSeats = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const res = await api.post('/bookings', {
        userId,
        showId,
        seats: selectedSeats
      });
      onBookingCreated(res.data._id);
    } catch (err) {
      alert("Booking failed. Seats might have been taken.");
    }
  };

  const styles = {
    container: {
      backgroundColor: '#0f172a',
      padding: '40px 20px',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      minHeight: '100vh'
    },
    screenCurve: {
      width: '80%',
      height: '10px',
      margin: '0 auto 50px auto',
      backgroundColor: '#3b82f6',
      borderRadius: '50% 50% 0 0',
      boxShadow: '0 -10px 20px #3b82f6',
    },
    screenText: {
      color: '#64748b',
      fontSize: '0.8rem',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      marginBottom: '60px'
    },
    seatGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))',
      gap: '12px',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    seat: (status, isSelected) => ({
      width: '45px',
      height: '45px',
      borderRadius: '8px',
      border: 'none',
      cursor: status === 'BOOKED' ? 'not-allowed' : 'pointer',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: status === 'BOOKED' 
        ? '#334155' // Dark slate for booked
        : isSelected 
        ? '#ef4444' // Red for selected
        : '#94a3b8', // Light gray for available
      color: status === 'BOOKED' ? '#64748b' : 'white',
      boxShadow: isSelected ? '0 0 15px #ef4444' : 'none',
      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    }),
    legend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '40px',
      fontSize: '0.85rem'
    },
    footer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#1e293b',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #334155'
    },
    proceedBtn: {
      backgroundColor: selectedSeats.length === 0 ? '#334155' : '#ef4444',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: 'bold',
      cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
      transition: '0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '40px' }}>Select Your Seats</h2>
      
      {/* Visual Screen */}
      <div style={styles.screenCurve} />
      <div style={styles.screenText}>All eyes this way</div>

      {/* Seats Map */}
      <div style={styles.seatGrid}>
        {seats.map(seat => (
          <button
            key={seat._id}
            disabled={seat.status === 'BOOKED'}
            onClick={() => toggleSeat(seat)}
            style={styles.seat(seat.status, selectedSeats.includes(seat.seatNumber))}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div><span style={{...styles.seat('AVAILABLE', false), display: 'inline-flex', width: 20, height: 20, marginRight: 8}}></span> Available</div>
        <div><span style={{...styles.seat('BOOKED', false), display: 'inline-flex', width: 20, height: 20, marginRight: 8}}></span> Occupied</div>
        <div><span style={{...styles.seat('AVAILABLE', true), display: 'inline-flex', width: 20, height: 20, marginRight: 8}}></span> Selected</div>
      </div>

      {/* Floating Action Bar */}
      <div style={styles.footer}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Selected Seats</div>
          <div style={{ fontWeight: 'bold' }}>{selectedSeats.join(', ') || 'None'}</div>
        </div>
        
        <button 
          style={styles.proceedBtn} 
          onClick={bookSeats}
          disabled={selectedSeats.length === 0}
        >
          Confirm {selectedSeats.length} Seats
        </button>
      </div>
    </div>
  );
}