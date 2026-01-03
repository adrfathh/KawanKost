import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/layout/AdminSidebar';
import AdminHeader from '../components/admin/layout/AdminHeader';
import ChatSidebar from '../components/admin/layout/ChatSidebar';
import { logout } from '../hooks/useAuth';

const AdminLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AdminSidebar />
      <div className='ml-62'>
        <AdminHeader onLogout={handleLogout} />
        <Outlet />
        <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
};

export default AdminLayout;