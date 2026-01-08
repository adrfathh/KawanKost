import { Routes, Route, Navigate } from 'react-router-dom';
import { getLoggedInUser } from './hooks/useAuth';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/register/Login';
import SignUp from './pages/register/SignUp';
import SearchPage from './components/public/sections/Search';
import Dashboard from './components/admin/section/Dashboard';
import ProfilePage from './components/public/sections/Profile';
import KostCollection from './components/public/sections/KostCollection';
import Favorites from './components/public/sections/Favorites';
import KostDetail from './components/public/sections/KostDetail';
import KostManagement from './components/admin/section/KostManagement';
import UserManagement from './components/admin/section/UserManagement';

function App() {
  const user = getLoggedInUser();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/detail-produk/:id" element={<KostDetail />} />
      <Route path="/kostCollection" element={<KostCollection />} />

      {/* User Routes */}
      <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" replace />} />
      <Route path="/profile" element={ user ? <ProfilePage user={user} /> : <Navigate to="/login" replace /> } />

      {/* Admin Routes */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="kosts" element={<KostManagement />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
