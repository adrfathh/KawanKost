import { useNavigate } from 'react-router-dom';
import { logout } from '../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // hapus loggedInUser dari localStorage
    navigate('/login');    // kembali ke halaman login
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
