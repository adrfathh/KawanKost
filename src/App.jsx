import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import KostManagement from './components/admin/KostManagement';
import UserManagement from './components/admin/UserManagement';
import ChatSidebar from './components/admin/ChatSidebar';
import Home from './pages/Home';
import Login from './pages/register/Login';
import SignUp from './pages/register/SignUp';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="kosts" element={<KostManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="chat" element={<ChatSidebar />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
