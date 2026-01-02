import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import KostManagement from './components/admin/KostManagement';
import UserManagement from './components/admin/UserManagement';
import Home from './pages/Home';
import Login from './pages/register/Login';
import SignUp from './pages/register/SignUp';
import Favorites from './components/public/sections/Favorites';
import SearchPage from './components/public/sections/Search';
import ProfilePage from './components/public/sections/Profile';
import { getLoggedInUser } from './hooks/useAuth';

function App() {
  const user = getLoggedInUser();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* User Routes */}
      <Route
        path="/favorites"
        element={user ? <Favorites /> : <Navigate to="/login" replace />}
      />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/profile"
        element={
          user ? <ProfilePage user={user} /> : <Navigate to="/login" replace />
        }
      />

      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="kosts" element={<KostManagement />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
