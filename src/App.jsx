import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Seats from './pages/Seats';
import Payment from './pages/Payment';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const adminToken = localStorage.getItem('adminToken');

  const [mode, setMode] = useState(null); // user | admin
  const [movieId, setMovieId] = useState(null);
  const [showId, setShowId] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const styles = {
    appWrapper: {
      backgroundColor: '#0f172a', // Global Background
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    },
    pageContainer: {
      flex: 1,
      animation: 'fadeIn 0.5s ease-out' // Uses the animation from your enhanced App.css
    }
  };

  // Helper function to wrap components in the page container
  const renderPage = (Component) => (
    <div style={styles.appWrapper}>
      <div style={styles.pageContainer} className="page-fade-in">
        {Component}
      </div>
    </div>
  );

  // 🔐 ADMIN FLOW
  if (adminToken) {
    return renderPage(<AdminDashboard />);
  }

  // 🔐 USER FLOW
  if (token && userId) {
    if (!movieId) return renderPage(<Movies onSelectMovie={setMovieId} />);
    if (!showId) return renderPage(<Shows movieId={movieId} onSelectShow={setShowId} />);
    if (!bookingId)
      return renderPage(<Seats showId={showId} onBookingCreated={setBookingId} />);
    return renderPage(<Payment bookingId={bookingId} />);
  }

  // 🔁 NOT LOGGED IN
  if (!mode) return renderPage(<Home onSelect={setMode} />);

  if (mode === 'admin') return renderPage(<AdminLogin />);
  return renderPage(<Login />);
}

export default App;