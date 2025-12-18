import Login from './pages/Login';
import Movies from './pages/Movies';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      {token ? <Movies /> : <Login />}
    </>
  );
}

export default App;
